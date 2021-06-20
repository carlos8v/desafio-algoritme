import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  Login,
  Register,
  Dashboard,
  NotFound
} from './pages';

import PrivateRoute from './PrivateRoute';

import { AuthProvider } from './contexts/AuthContext';
import { TransactionProvider } from './contexts/TransactionContext';

const MainContext: React.FC = ({ children }) => (
  <AuthProvider>
    <TransactionProvider>
      {children}
    </TransactionProvider>
  </AuthProvider>
)

const App: React.FC = () => {
  return (
    <MainContext>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </MainContext>
  );
}

export default App;
