const { Server } = require('socket.io')
const express = require('express')
const cors = require('cors')
const http = require('http')

const client = 3001
const port = `http://localhost:3000`
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: port,
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(client, () => {
    console.log(`Anchoring Server on Port ${port}`);
    console.log(`Analyzing Client ${client}`);
});
