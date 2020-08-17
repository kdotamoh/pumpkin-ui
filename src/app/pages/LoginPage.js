import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setUser,
  // fetchUser
} from '../store/auth';
import { useHistory } from 'react-router-dom';

import '../../style/login-page.css';
import pumpkin from 'assets/logo-large.png';

import { login } from '../../api/auth';

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async () => {
    setSubmitting(true);
    try {
      const user = await login({ username: email, password });
      // await dispatch(fetchUser({ username: email, password }));
      dispatch(setUser(user)); // TODO: use a thunk instead?

      // user.roles.includes('ADMIN')
      //   ? history.push('/employees')
      //   : history.push('/alumni'); // TODO: Not sure if this is the right page for an alum. Also means protecting routes so alums can't access employee routes
      history.push('/applications');
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="login-page__main">
        <div className="login-page__navigation">
          <figure style={{ maxHeight: '10rem' }}>
            <img
              src={pumpkin}
              style={{ height: '100%', width: 'auto' }}
              alt=""
            />
          </figure>
          <a className="login-form__link" href="#/">
            Home
          </a>
        </div>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <h1 className="login-form__h1">ADMIN PORTAL</h1>
          <h3 className="login-form__h3">LOGIN</h3>

          <label className="form__label" htmlFor="email">
            E-Mail
          </label>
          <input
            type="text"
            name="email"
            className="form__input mb-2rem"
            placeholder="Your E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form__input mb-2rem"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                className="form__input"
                id=""
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                style={{ marginRight: '1rem' }}
              />
              Remember me
            </label>
            <Link style={{ color: 'rgb(223, 226, 229)' }} to="#/">
              Forgot password?
            </Link>
          </div>

          <button
            className="button button--primary login-form__button"
            type="submit"
          >
            {submitting ? 'Submitting...' : 'Login'}
          </button>
        </form>

        <div className="login-page__navigation">
          <div>
            <Link className="login-form__link" to="#/">
              Impress
            </Link>
            <span> • </span>
            <Link className="login-form__link" to="#/">
              Privacy
            </Link>
          </div>
          <Link className="login-form__link" to="#/">
            • EN
          </Link>
        </div>
      </div>
      <div className="login-page__image" />
    </div>
  );
};
