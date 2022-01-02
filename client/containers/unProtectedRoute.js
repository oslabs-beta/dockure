import React, { component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import TokenStorage from '../db/token';

const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const token = TokenStorage.getToken();

  return (
    <Route
      {...rest}
      render={() => (token ? <Redirect to='/main' /> : <Component {...rest} />)}
    />
  );
};

export default UnProtectedRoute;
