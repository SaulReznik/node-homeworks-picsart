import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import classNames from 'classnames/bind';

import styles from './Chat.module.css';

const token = sessionStorage.getItem('token');
const socket = io('http://localhost:3002', {
  query: { token }
});

const cx = classNames.bind(styles);

const Chat = () => {
  const [user, setUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('connected', msg => {
      setUser(msg.user);
    });
  }, []);

  const inputChangeHandler = e => setInput(e.target.value);

  const sendMessage = () => {
    socket.emit('newMessage', `${user}: ${input}`);
    socket.on('messages', newMessages => setMessages(newMessages));
    setInput('');
  };

  return (
    <div className={cx('chat-container')}>
      <div className={cx('messages-container')}>
        <div className={cx('message-container')}>Greetings {user}!!!</div>
        {messages.map((message, index) => (
          <div className={cx('message-container')} key={index}>
            {message}
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
