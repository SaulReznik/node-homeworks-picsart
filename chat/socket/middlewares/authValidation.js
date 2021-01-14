const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

// JWT authentication via socket's handshake
module.exports = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
};
