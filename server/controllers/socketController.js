const app = require('../app')
const { Message, Topic, User } = require('../models')
let io
const rooms = []
const socketIoInit = (app) => {
    const { Server } = require('socket.io')
    const client = `http://localhost:3000`

    io = new Server(app, {
        cors: {
            origin: client,
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });
    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
      
        socket.on("join_room", (data) => {
            
            let index = rooms.findIndex((el) => el.number == data)

            if (index == -1 ) {
                rooms.push({number: data, messages: []})
                console.log(`User with ID: ${socket.id} CREATED room: ${data}`);
                socket.join(data);
            }
            else {
                console.log("ini rooms", rooms[index]);
                console.log(`User with ID: ${socket.id} joined room: ${data}`);
                socket.to(data).emit("previous_message", rooms[index].messages[0]);
                socket.join(data);
            }
        }); // => need to send previous data 
      
        socket.on("send_message", async (data) => {
            try {
                console.log(data);
                let index = rooms.findIndex((el) => el.number == data.room)
                if (index >= 0) {
                    rooms[index].messages.push(data)
                    console.log(rooms[index]);
                }
                console.log(data);
                let { title, UserId, text } = data
                let calledForum = await Topic.findOne({where: { title }})
                if (!calledForum) throw ({name: "UnknownForum"})
    
                await Message.create({TopicId: calledForum.id, UserId, text})
                //{ room: '123', author: 'marmar', message: 'hahay', time: '10:7' }
                socket.to(data.room).emit("receive_message", data);
            } catch (error) {
                console.log(error);
            }

        });
      
        socket.on("disconnect", () => {
          console.log("User Disconnected", socket.id);
        });
      });
    // return io 
}

////////////////////////////////////////////////////

// const io = socketIoInit(app)

// io.on("connection", (socket) => {

//     console.log(`User Connected: ${socket.id}`);

//     socket.on("join_room", (data) => {
//         socket.join(data);
//     });

//     socket.on("send_message", (data) => {
//         socket.to(data.room).emit("receive_message", data);
//     });
// });



  module.exports = socketIoInit

//   const emitSocket = (socket, event, msg) => {
//     if (!(socket instanceof Socket)) throw new TypeError("Expected socket instance of Socket, got " + (typeof socket));
//     if (typeof event !== "string") throw new TypeError("Expected event as string, got " + (typeof event));
//     if (typeof msg !== "string") throw new TypeError("Expected msg as string, got " + (typeof msg));
//     if (!event) throw new TypeError("event can't be empty");
//     if (!msg) throw new TypeError("msg can't be empty");
  
//     io.to(socket.id).emit(event, msg);
//   }

//   const distributeMessage = (groupMembers, data, event) => {
//     if (!groupMembers) throw new TypeError("groupMembers can't be falsy");
//     if (!data) throw new TypeError("data can't be falsy");
//     const fromUserId = validateUserId(data.UserId);
//     if (!Array.isArray(groupMembers)) throw new TypeError("Expected groupMembers as array, got " + groupMembers);
  
//     for (const member of groupMembers) {
//       if (!member) throw new TypeError("member can't be falsy");
//       const memberId = validateUserId(member.UserId);
//       if (memberId === fromUserId) continue;
  
//       const socket = userSockets.get(memberId);
//       if (socket) emitSocket(socket, event, jString(data));
//     }
//   }

//   const sendMessage = (groupMembers, data) => {
//     return distributeMessage(groupMembers, data, SOCKET_EVENTS.MESSAGE);
//   };

