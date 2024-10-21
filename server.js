const server = require('express')();
const http = require('http').createServer(server);
// const io = require('socket.io')(http);
// Need to include the cors parameter
// Since Socket.IO v3, you need to explicitly enable Cross-Origin Resource Sharing (CORS).
const io = require("socket.io")(http, {
    cors: {
      origin: "http://192.168.1.207:8080",
      methods: ["GET", "POST"]
    }
  });
  
  let players = [];

  io.on('connection', function (socket) {
      console.log('A user connected: ' + socket.id);
  
      players.push(socket.id);
  
      if (players.length === 1) {
          io.emit('isPlayerA');
      };
  
      socket.on('dealCards', function () {
          io.emit('dealCards');
      });
  
      socket.on('cardPlayed', function (gameObject, isPlayerA) {
          io.emit('cardPlayed', gameObject, isPlayerA);
      });
  
      socket.on('disconnect', function () {
          console.log('A user disconnected: ' + socket.id);
          players = players.filter(player => player !== socket.id);
      });
  });
  
  http.listen(3000, function () {
      console.log('Server started!');
  });