import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import classNames from 'classnames/bind';

import styles from './Chat.module.css';

const token = sessionStorage.getItem('token');

const cx = classNames.bind(styles);

const Chat = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef(
    io('http://localhost:3002', {
      query: { token }
    })
  );

  useEffect(() => {
    socketRef.current.on('connected', msg => {
      console.log('connected');
      setIsConnected(true);
      setMessages(msg.messages);
    });

    socketRef.current.on('newMessage', newMessage => {
      setMessages(messages => [...messages, newMessage]);
    });
  }, []);

  const inputChangeHandler = e => setInput(e.target.value);

  const sendMessage = () => {
    socketRef.current.emit('sendMessage', {
      user: user.username,
      message: input
    });

    setInput('');
  };

  if (!isConnected) {
    return <h1>Waiting for connection...</h1>;
  }
  return (
    <div className={cx('chat-container')}>
      <div className={cx('messages-container')}>
        <div className={cx('message-container')}>
          Greetings {user.username}!!!
        </div>
        {messages.map((message, index) => (
          <div className={cx('message-container')} key={index}>
            {message.user}: {message.message}
          </div>
        ))}
      </div>
      <div className={cx('inputs-container')}>
        <input
          className={cx('input')}
          value={input}
          onChange={e => inputChangeHandler(e)}
        />
        <button className={cx('send-button')} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
