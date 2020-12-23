import React, { Component } from 'react';
import PrivateRoute from './app/hocs/PrivateRoute';

import PublicRoute from 'app/hocs/PublicRoute';
import { unauthorized, authorized } from './app/routes/routes';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import logo from './assets/seo-africa-logo.png';

export default class App extends Component {
  renderContent = () => {
    if (isMobileOnly) {
      return (
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
      );
    }
    return (
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
    );
  };

  render() {
    return this.renderContent();
  }
}
