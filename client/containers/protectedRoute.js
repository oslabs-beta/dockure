import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // logic for authentication
  const isAuthenticated = true;
  return (
    <Route {...rest} render={() => isAuthenticated ? <Component {...rest} /> : <Redirect to='/login?unauthenticated=true' />} />
  );
}

export default ProtectedRoute;