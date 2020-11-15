const io = require('socket.io').listen(3002);
const jwt = require('jsonwebtoken');

const messages = [];

io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      '4-8-15-16-23-42',
      (err, decoded) => {
        if (err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error('Authentication error'));
  }
}).on('connection', socket => {
  socket.emit('connected', {
    user: socket.decoded.username,
    messages
  });

  socket.on('newMessage', message => {
    messages.push(message);
    io.emit('messages', messages);
  });
});
