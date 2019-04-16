// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const fs = require('fs');

app.use(express.static(__dirname + '/public'));


server.listen(8080)
var equips = []
fs.readdir("./public/equipments", (err, files) => {
  //console.log(files.length,files);
  equips = equips.concat(files)
});

io.on('connection', function(socket){
    console.log("oy")
    
    socket.emit("amulets-qnt",equips)
  });
