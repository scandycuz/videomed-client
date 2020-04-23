import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ enabled, redirect, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        enabled ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  enabled: PropTypes.bool,
  redirect: PropTypes.string,
  children: PropTypes.node,
};

ProtectedRoute.defaultProps = {
  enabled: false,
  redirect: '/login',
};

export default ProtectedRoute;
