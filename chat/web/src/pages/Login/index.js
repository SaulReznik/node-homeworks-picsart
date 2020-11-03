import { useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import io from 'socket.io-client';
import classNames from 'classnames/bind';

import styles from './Login.module.css';

const cx = classNames.bind(styles);
const apiUrl = 'http://localhost:3001';
const socketUrl = 'http://localhost:3002';

const Login = () => {
  const [fields, setFields] = useState({
    username: '',
    password: ''
  });

  const { push } = useHistory();

  const handleFieldChange = useCallback(
    e => {
      const { name, value } = e.target;

      setFields(prevstate => ({
        ...prevstate,
        [name]: value
      }));
    },
    [setFields]
  );

  const handleLoginSubmit = useCallback(
    async e => {
      try {
        e.preventDefault();
        const body = JSON.stringify(fields);

        const response = await fetch(`${apiUrl}/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        });

        const token = await response.json();
        sessionStorage.setItem('token', token.accessToken);
        push('/chat');
      } catch (err) {
        console.log('login Submit Error ------->', err);
      }
    },
    [push, fields]
  );

  return (
    <div className={cx('form-container')}>
      <form className={cx('form')} onSubmit={e => handleLoginSubmit(e)}>
        <h2>Login</h2>
        <input
          className={cx('input')}
          name="username"
          value={fields.username}
          placeholder="username"
          onChange={e => handleFieldChange(e)}
        />
        <input
          className={cx('input')}
          name="password"
          type="password"
          value={fields.password}
          placeholder="password"
          onChange={e => handleFieldChange(e)}
        />
        <input className={cx('submit')} type="submit" value="Login" />
        <span>
          Not a registrated yet? <Link to="/registration">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
