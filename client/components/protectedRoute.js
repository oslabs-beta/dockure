import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Auth from "./Auth";

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <div></div>
    // <Route
    //   {...rest}
    //   render={() => {
    //     return Auth.isAuthenticated() === true ? (
    //       children
    //     ) : (
    //       <Redirect to="/login" />
    //     );
    //   }}
    // />
  );
};

export default ProtectedRoute;
