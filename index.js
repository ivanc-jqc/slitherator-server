const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
const players = {}

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.emit('existing players', players) 
  if( !(socket.id in players) ){
    players[socket.id] = {
        x: 0,
        y: 0
    }
  }
  
  
  socket.on('position', (position) => {
    players[socket.id] = position
  });
  socket.on('disconnect', () => {
      delete players[socket.id];
      socket.broadcast.emit('player disconnect', socket.id);
  })
});
setInterval(()=>{
  io.emit("position" ,players)
  console.log(players); 
}, 1000)
server.listen(3000, () => {
  console.log("server listening")
});