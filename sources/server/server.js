const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', function(socket){
    socket.on('chat', (msg) => {
        io.emit('chat', msg);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
