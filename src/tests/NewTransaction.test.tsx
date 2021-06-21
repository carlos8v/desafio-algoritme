import React from 'react';
import renderWithRouter from './renderWithRouter';
import { waitFor, fireEvent, screen } from '@testing-library/react';
import App from '../App';

import {
  addTransaction,
  mockUseAuth,
  mockUseTransaction,
  mockFirestoreOnSnapshot,
  createHistory,
} from './actions';

import { mockedTransactions, mockedNewTransaction } from './mocks';

describe('Dashboard page', () => {
  beforeEach(() => {
    mockUseAuth();
    mockFirestoreOnSnapshot();
  });

  const mockedHistory = createHistory(['/new']);

  afterEach(() => jest.clearAllMocks());
  
  it('should have the correct pathname', async () => {
    const { history, getByTestId } = renderWithRouter(<App />);

    await waitFor(() => {
      fireEvent.click(getByTestId('new-transaction-link'));

      const expected = '/new';
      expect(history.location.pathname).toBe(expected);
    });
  });

  it('should contain the correct data-testid', async () => {
    const { getByTestId } = renderWithRouter(<App />, mockedHistory);

    await waitFor(() => {
      const typeInput = getByTestId('type-input');
      const valueInput = getByTestId('value-input');
      const submitButton = getByTestId('submit-button');

      const incomingOption = getByTestId('incoming-option');
      const outgoingOption = getByTestId('outgoing-option');

      expect(typeInput).toBeInTheDocument();
      expect(valueInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
      expect(incomingOption).toBeInTheDocument();
      expect(outgoingOption).toBeInTheDocument();

      expect((incomingOption as HTMLOptionElement).selected).toBe(true);
      expect((outgoingOption as HTMLOptionElement).selected).toBe(false);
    });
  });

  it('should add a new transaction', async () => {
    const { addFunction, mockedUseTransaction } = mockUseTransaction(mockedTransactions, mockedNewTransaction);

    const { history, getByTestId, queryByTestId } = renderWithRouter(<App />);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
      const element = queryByTestId(`transaction-${mockedNewTransaction.id}-value`);
      expect(element).not.toBeInTheDocument();
    });
    
    fireEvent.click(getByTestId('new-transaction-link'));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/new');
      addTransaction(mockedNewTransaction, screen);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');

      const element = getByTestId(`transaction-${mockedNewTransaction.id}-value`);
      expect(element).toBeInTheDocument();

      expect(mockedUseTransaction).toBeCalled();

      expect(addFunction).toBeCalled();
      expect(addFunction).toBeCalledTimes(1);
    });
  });
});
