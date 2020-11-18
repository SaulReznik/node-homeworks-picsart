import { useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Login.module.css';

const cx = classNames.bind(styles);
const apiUrl = 'http://localhost:3001';

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

  const validation = () =>
    fields.username.length < 3 || fields.password.length < 8;

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

        const data = await response.json();
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('user', JSON.stringify(data.user));
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
        <input
          disabled={validation()}
          className={cx('submit')}
          type="submit"
          value="Login"
        />
        <span>
          Not a registrated yet? <Link to="/registration">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
