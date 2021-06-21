import { Screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { TransactionProps } from '../contexts/TransactionContext';
import { auth, db } from '../services/firebase';

import * as authContext from '../contexts/AuthContext';
import * as transactionContext from '../contexts/TransactionContext';

import { mockedTransactions, mockedNewTransaction } from './mocks';

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

export const addTransaction = (newTransaction: TransactionProps, screen: Screen) => {
  const typeInput = screen.getByTestId('type-input');
  const valueInput = screen.getByTestId('value-input');
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.change(typeInput, { target: { value: newTransaction.type } });
  fireEvent.change(valueInput, { target: { value: newTransaction.value } });

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

export const mockUseAuth = (mockedUser = { email: 'admin@algoritme.com' }) => {
  const mockedUseAuth = jest.spyOn(authContext, 'useAuth');
  (mockedUseAuth as jest.Mocked<any>).mockImplementation(() => ({
    currentUser: mockedUser,
  }));

  return mockedUseAuth;
};

export const mockFirestoreOnSnapshot = (mockedTrxs: TransactionProps[] = mockedTransactions) => {
  const mockedResult = {
    docs: mockedTrxs.map((trx) => ({
      id: trx.id,
      data: () => ({
        type: trx.type,
        user: trx.user,
        value: trx.value,
      })
    })),
  };

  const mockedFirestoreOnSnapshot = jest.spyOn(db, 'onSnapshot');
  (mockedFirestoreOnSnapshot as jest.Mocked<any>)
    .mockImplementation((cb: (_: any) => void) => {
      cb(mockedResult);
      return () => {};
    });

  return mockedFirestoreOnSnapshot;
};

export const mockUseTransaction = (
  mockedTrxs: TransactionProps[] = mockedTransactions,
  newTrx: TransactionProps = mockedNewTransaction,
) => {
  const mockedAddFunction = jest.fn().mockResolvedValue(mockedTrxs.push(newTrx));
  const mockedUseTransaction = jest.spyOn(transactionContext, 'useTransaction');
  (mockedUseTransaction as jest.Mocked<any>).mockImplementation(() => ({
    add: mockedAddFunction,
    transactions: mockedTrxs,
  }));

  return { mockedUseTransaction, addFunction: mockedAddFunction };
};
