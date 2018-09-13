const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', function(socket){
    let room = '';
    socket.on('client_to_server', (msg) => {
        io.to(room).emit('server_to_client', msg);
    });
    socket.on('client_to_server_join', function(data) {
        room = data;
        socket.join(room);
    });
    socket.on('client_to_server_broadcast', function(data) {
        socket.broadcast.to(room).emit('server_to_client', data);
    });
    socket.on('client_to_server_personal', function(data) {
        var id = socket.id;
        io.to(id).emit('server_to_client', data);
    });
    socket.on('disconnect', function() {
        io.to(room).emit('server_to_client', "退出しました");
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
