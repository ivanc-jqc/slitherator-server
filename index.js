const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      socket.broadcast.emit('chat message',msg)
    console.log(msg);
  });
  socket.on('position', (msg) => {
    socket.broadcast.emit('position',msg)
    console.log(socket.id)
    console.log(msg); 
  });
});

server.listen(3000, () => {
  console.log("server listening")
});