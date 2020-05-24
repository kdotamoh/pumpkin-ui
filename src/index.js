import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { unauthorized, authorized } from './routes/routes';

import PrivateRoute from './hocs/PrivateRoute';

import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          {unauthorized.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={(props) => {
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
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
