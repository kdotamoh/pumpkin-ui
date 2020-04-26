import React, { FunctionComponent } from 'react';
import 'style/login-page.css';

export const LoginPage: FunctionComponent = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="login-page">
      <div className="login-page__main">
        <div className="login-page__navigation">
          <div>logo</div>
          <a className="login-form__link" href="#/">
            Home
          </a>
        </div>
        <form className="login-form">
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
                style={{ marginRight: '1rem' }}
              />
              Remember me
            </label>
            <a style={{ color: 'rgb(223, 226, 229)' }} href="#/">
              Forgot password?
            </a>
          </div>

          <button
            className="button button--primary login-form__button"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="login-page__navigation">
          <div>
            <a className="login-form__link" href="#/">
              Impress
            </a>
            <span> • </span>
            <a className="login-form__link" href="#/">
              Privacy
            </a>
          </div>
          <a className="login-form__link" href="#/">
            • EN
          </a>
        </div>
      </div>
      <div className="login-page__image" />
    </div>
  );
};
