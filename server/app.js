const express = require('express')
const cors = require('cors')
const http = require('http')

const client = 3001
const port = `http://localhost:3000`
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: client,
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(client, () => {
    console.log(`Anchoring Server on Port ${port}`);
    console.log(`Analyzing Client ${client}`);
});