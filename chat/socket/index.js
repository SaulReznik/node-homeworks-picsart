const io = require('socket.io').listen(3002);
const jwt = require('jsonwebtoken');
const { MessageModel } = require('@saulreznik/chat-mongo-models');
const mongoose = require('mongoose');

const { jwtToken, urlDB } = require('./config');

//MongoDB connection
mongoose.connect(urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//User verification via handshake
io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, jwtToken, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
}).on('connection', async socket => {
  try {
    const messagesDB = await MessageModel.find();
    const messages = messagesDB.map(item => item.message);

    socket.emit('connected', {
      user: socket.decoded.username,
      messages
    });

    socket.on('newMessage', async message => {
      try {
        const Message = new MessageModel({ message });
        await Message.save();
        const messagesDB = await MessageModel.find();
        const messages = messagesDB.map(item => item.message);

        io.emit('messages', messages);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
