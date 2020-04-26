import React from 'react';
import ReactDOM from 'react-dom';
import 'style/index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from 'routes/routes';

  ReactDOM.render(
    <Router>
      {routes.map((route, index) => {
        return (
          <React.StrictMode key = {index}>
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={(props: any) => {
              return (
                route.layout ? 
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout> :
               <route.component {...props} />
              );
            }}
          />
          </React.StrictMode>
        );
      })}
  </Router>
  , document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
