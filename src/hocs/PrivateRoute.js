import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default connect((state) => ({
  token: state.user.userToken,
}))(PrivateRoute);
