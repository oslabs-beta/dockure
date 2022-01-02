import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import decode from 'jwt-decode';
import TokenStorage from '../db/token';

const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const token = TokenStorage.getToken();
  const decodeToken = token ? decode(token) : false;
  const now = Math.floor(new Date().getTime() / 1000);
  const isNotExpired = decodeToken ? decodeToken.exp > now : false;

  return (
    <Route
      {...rest}
      render={() =>
        isNotExpired ? <Redirect to='/main' /> : <Component {...rest} />
      }
    />
  );
};

export default UnProtectedRoute;
