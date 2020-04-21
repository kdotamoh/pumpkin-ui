import React, { FunctionComponent } from 'react';
import 'style/login-page.css';

export const LoginPage: FunctionComponent = () => {
  return (
    <div className="login-page">
      <div className="login-page__main">
        <h1>ADMIN PORTAL</h1>
        <form className="login-form">
          <h3>LOGIN</h3>

          <label htmlFor="email">E-Mail</label>
          <input type="text" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" />

          <label htmlFor="remember-me">
            <input type="checkbox" name="rememberMe" id="" />
            Remember me
          </label>

          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <img className="login-page__image" src="" alt="Login" />
      </div>
    </div>
  );
};
