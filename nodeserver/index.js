const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => {
    socket.io('new-user-joined', name => {
        console.log('New User');
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.io('send', message => {
        socket.broadcast.emit('receive',{message: message, name:users[socket.id]});
    });

    socket.io('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
    socket.io('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});

  
