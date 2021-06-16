import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const isUserAuthenticated = () => false;

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  return isUserAuthenticated()
    ? <Route {...props} />
    : <Redirect push to="/login" />;
};

export default PrivateRoute;
