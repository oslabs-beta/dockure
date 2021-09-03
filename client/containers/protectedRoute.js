import React, { component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import TokenStorage from '../db/token';
const tokenStorageService = new TokenStorage();

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = tokenStorageService.getToken();
  let isToken = false;
  if (token) isToken = true;

  return (
    <Route
      {...rest}
      render={() => (isToken ? <Component {...rest} /> : <Redirect to='/' />)}
    />
  );
};

export default ProtectedRoute;
