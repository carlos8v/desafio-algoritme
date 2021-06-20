import { Screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { TransactionProps } from '../contexts/TransactionContext';
import { auth, db } from '../services/firebase';

import * as authContext from '../contexts/AuthContext';

import { transactions } from './mocks';

export const createHistory = (routes: string[] = []) => {
  const mockedHistory = createMemoryHistory();

  for (const route of routes) {
    mockedHistory.push(route);
  }

  return mockedHistory;
};

export const logUser = (email: string, password: string, screen: Screen) => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  fireEvent.click(submitButton);
};

export const signUp = (email: string, password: string, screen: Screen) => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const confirmPasswordInput = screen.getByTestId('confirm-password-input');
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });

  fireEvent.click(submitButton);
};

export const mockSignIn = (mockedUser = { email: 'admin@algoritme.com' }) => {
  const mockedSignIn = jest.spyOn(auth, 'signInWithEmailAndPassword');
  (mockedSignIn as jest.Mocked<any>).mockImplementation(() => Promise.resolve(mockedUser));
  return mockedSignIn;
};

export const mockSignUp = (mockedUser = { email: 'admin@algoritme.com' }) => {
  const mockedSignUp = jest.spyOn(auth, 'createUserWithEmailAndPassword');
  (mockedSignUp as jest.Mocked<any>).mockImplementation(() => Promise.resolve(mockedUser));
  return mockedSignUp;
};

export const mockCheckLoggedUser = (mockedUser = { email: 'admin@algoritme.com' }) => {
  const mockedCheckLoggedUser = jest.spyOn(authContext, 'useAuth');
  (mockedCheckLoggedUser as jest.Mocked<any>).mockImplementation(() => ({
    currentUser: mockedUser,
  }));

  return mockedCheckLoggedUser;
};

export const mockGetTransactions = (mockedTransactions: TransactionProps[] = transactions) => {
  const mockedResult = {
    docs: mockedTransactions.map((trx) => ({
      id: trx.id,
      data: () => ({
        type: trx.type,
        user: trx.user,
        value: trx.value,
      })
    })),
  };

  const mockGetTransactions = jest.spyOn(db, 'onSnapshot');
  (mockGetTransactions as jest.Mocked<any>)
    .mockImplementation((cb: (_: any) => void) => {
      cb(mockedResult);
      return () => {};
    });

  return mockGetTransactions;
};
