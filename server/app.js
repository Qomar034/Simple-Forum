const { Server } = require('socket.io')
const express = require('express')
const cors = require('cors')
const http = require('http')

const port = process.env.PORT || 7777
const client = `http://localhost:8888`
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const io = new Server(server, {
  cors: {
    origin: client,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

server.listen(port, () => {
  console.log(`Anchoring Server on Port ${port}`);
  console.log(`Analyzing Client ${client}`);
});