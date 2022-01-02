import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import TokenStorage from '../db/token';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = TokenStorage.getToken();

  return (
    <Route
      {...rest}
      render={() => (token ? <Component {...rest} /> : <Redirect to='/' />)}
    />
  );
};

export default ProtectedRoute;
