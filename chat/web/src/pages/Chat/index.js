import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import classNames from 'classnames/bind';

import styles from './Chat.module.css';

const token = sessionStorage.getItem('token');

const cx = classNames.bind(styles);

const Chat = () => {
  const [user, setUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef(
    io('http://localhost:3002', {
      query: { token }
    })
  );

  useEffect(() => {
    console.log(socketRef.current);
    socketRef.current.on('connected', msg => {
      console.log('connected');
      setUser(msg.user);
      setIsConnected(true);
      socketRef.current.on('message', message => {
        setMessages(messages => [...messages, message]);
      });
    });

    // return () => {
    //   socketRef.current.disconnect();
    // };
  }, []);

  const inputChangeHandler = e => setInput(e.target.value);

  const sendMessage = () => {
    socketRef.current.emit('newMessage', `${user}: ${input}`);
    socketRef.current.on('messages', newMessages => setMessages(newMessages));
    setInput('');
  };

  if (!isConnected) {
    return <h1>Waiting for connection...</h1>;
  }
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
