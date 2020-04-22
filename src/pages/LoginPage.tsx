import React, { FunctionComponent } from 'react';
import 'style/login-page.css';

export const LoginPage: FunctionComponent = () => {
  return (
    <div className="login-page">
      <div className="login-page__main">
        <div className="login-page__navigation">
          <div>logo</div>
          <a href="#/">Home</a>
        </div>
        <form className="login-form">
          <h1>ADMIN PORTAL</h1>
          <h3>LOGIN</h3>

          <label htmlFor="email">E-Mail</label>
          <input type="text" name="email" className="login-form__input" />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="login-form__input"
          />

          <label htmlFor="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              className="login-form__input"
              id=""
            />
            Remember me
          </label>

          <button className="button button--primary" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="login-page__image" />
    </div>
  );
};
