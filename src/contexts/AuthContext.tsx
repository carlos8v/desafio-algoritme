import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth, firebase } from '../services/firebase';

import { Loading } from '../components';

interface AuthContextProps {
  currentUser: firebase.User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential | void>;
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential | void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loading: true,
  signup: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (<Loading />) : (children)}
    </AuthContext.Provider>
  );
};
