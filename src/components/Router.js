import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../containers/Auth';

const Users = () => <div>User page</div>;

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Auth} />
      <PrivateRoute path="/users/" component={Users} />
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
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
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default AppRouter;
