import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth';
import { useHistory } from 'react-router-dom';

import 'style/login-page.css';

import { login } from 'api/auth';

export const LoginPage: FunctionComponent = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async () => {
    setSubmitting(true);
    const user = await login({ username: email, password });
    setSubmitting(false);
    dispatch(setUser(user));
    history.push('/employees');
  };

  return (
    <div className="login-page">
      <div className="login-page__main">
        <div className="login-page__navigation">
          <div>logo</div>
          <a className="login-form__link" href="#/">
            Home
          </a>
        </div>
        <form
          className="login-form"
          onSubmit={(e): void => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <h1 className="login-form__h1">ADMIN PORTAL</h1>
          <h3 className="login-form__h3">LOGIN</h3>

          <label className="login-form__label" htmlFor="email">
            E-Mail
          </label>
          <input
            type="text"
            name="email"
            className="login-form__input"
            placeholder="Your E-Mail"
            value={email}
            onChange={(e): void => setEmail(e.target.value)}
          />

          <label className="login-form__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="login-form__input"
            placeholder="Your Password"
            value={password}
            onChange={(e): void => setPassword(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                className="login-form__input"
                id=""
                checked={rememberMe}
                onChange={(): void => setRememberMe(!rememberMe)}
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
