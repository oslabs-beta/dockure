import React, { component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import TokenStorage from '../db/token';
const tokenStorageService = new TokenStorage();

const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const token = tokenStorageService.getToken();
  let isToken = false;
  if (token) isToken = true;

  return (
    <Route
      {...rest}
      render={() =>
        isToken ? <Redirect to='/main' /> : <Component {...rest} />
      }
    />
  );
};

export default UnProtectedRoute;
