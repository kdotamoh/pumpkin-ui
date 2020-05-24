import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ Component, token, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

PrivateRoute.propTypes = {
  token: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
};

export default connect((state) => ({
  token: state.user.userToken,
}))(PrivateRoute);
