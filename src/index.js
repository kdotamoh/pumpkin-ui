import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/index.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { unauthorized, authorized } from './app/routes/routes';

import { BrowserView, MobileView } from 'react-device-detect';

import PrivateRoute from './app/hocs/PrivateRoute';

import store from './app/store';
import PublicRoute from 'app/hocs/PublicRoute';
import logo from './assets/seo-africa-logo.png';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <MobileView>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <img style={{ width: '40%', height: 'auto' }} src={logo} alt="" />
        <p style={{ width: '50%', fontSize: '120%', marginTop: '4rem' }}>
          This app is optimised for larger screen sizes.
          <br />
          Please access this app on a desktop or tablet device.
        </p>
      </div>
    </MobileView>

    <BrowserView>
      <Router>
        <Switch>
          {unauthorized.map((route) => (
            <PublicRoute
              key={route.path}
              path={route.path}
              exact={route.exact}
              Component={(props) => {
                return route.layout ? (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                ) : (
                  <route.component {...props} />
                );
              }}
            />
          ))}
          {authorized.map((route) => (
            <PrivateRoute
              key={route.path}
              path={route.path}
              exact={route.exact}
              Component={(props) => {
                return route.layout ? (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                ) : (
                  <route.component {...props} />
                );
              }}
            />
          ))}
        </Switch>
      </Router>
    </BrowserView>
  </Provider>,

  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
