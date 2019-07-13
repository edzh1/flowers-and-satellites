import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './containers/Auth';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Auth} />
      {/* <Route path="/users/" component={Users} /> */}
    </Router>
  );
}

export default AppRouter;
