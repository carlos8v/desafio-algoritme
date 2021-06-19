import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { currentUser } = useAuth();

  return currentUser
    ? <Route {...props} />
    : <Redirect push to="/login" />;
};

export default PrivateRoute;
