const app = require('../app')


const express = require('express')
const cors = require('cors')
const http = require('http')

const client = `http://localhost:8888`


const socketIoInit = (app) => {
    const { Server } = require('socket.io')
    const http = require('http')
    const server = http.createServer(app)
    
    const io = new Server(server, {
        cors: {
            origin: client,
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });
    return io 
}

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
});

