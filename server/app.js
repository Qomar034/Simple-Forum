const express = require('express')
const cors = require('cors')
const http = require('http')

const port = process.env.PORT || 7777
const client = `http://localhost:8888`
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Anchoring Server on Port ${port}`);
    console.log(`Analyzing Client ${client}`);
});

module.exports = server