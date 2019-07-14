import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../containers/Auth';
import Grid from '../containers/Grid';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Auth} />
      <PrivateRoute path="/grid/" component={Grid} />
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const genericToken = localStorage.getItem('genericToken');
  const tenantToken = localStorage.getItem('tenantToken');
  const isAuthorized = genericToken && tenantToken;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
  location: PropTypes.object,
};

export default AppRouter;
