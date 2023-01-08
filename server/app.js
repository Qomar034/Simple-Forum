const {socketIoInit} = require('./controllers/socketController')

const { Server } = require('socket.io')
const express = require('express')
const cors = require('cors')
const http = require('http')

const port = 3001
const client = `http://localhost:3000`
const app = express()
const server = http.createServer(app)
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

socketIoInit(server)
server.listen(port, () => {
    console.log(`Anchoring Server on client ${client}`);
    console.log(`Analyzing client on ${port}`);
});

module.exports = server