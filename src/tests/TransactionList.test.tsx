import React from 'react';
import renderWithRouter from './renderWithRouter';
import { waitFor, fireEvent } from '@testing-library/react';
import App from '../App';

import {
  mockUseAuth,
  mockUseTransaction,
  mockFirestoreOnSnapshot,
  createHistory,
} from './actions';

import { mockedTransactions } from './mocks';

describe('TransactionList page', () => {  
  beforeEach(() => {
    mockUseAuth();
    mockFirestoreOnSnapshot();
  });

  const mockedHistory = createHistory(['/list']);

  afterEach(() => jest.clearAllMocks());
  
  it('should have the correct pathname', async () => {
    const { history, getByTestId } = renderWithRouter(<App />);

    await waitFor(() => {
      fireEvent.click(getByTestId('list-transaction-link'));

      const expected = '/list';
      expect(history.location.pathname).toBe(expected);
    });
  });

  it('should contain the correct data-testid', async () => {
    const { getByTestId } = renderWithRouter(<App />, mockedHistory);

    await waitFor(() => {
      const newTransactionLink = getByTestId('new-transaction-link');
      const typeInput = getByTestId('type-input');

      const allOption = getByTestId('all-option');
      const incomingOption = getByTestId('incoming-option');
      const outgoingOption = getByTestId('outgoing-option');

      expect(newTransactionLink).toBeInTheDocument();
      expect(typeInput).toBeInTheDocument();
      expect(incomingOption).toBeInTheDocument();
      expect(outgoingOption).toBeInTheDocument();

      expect((allOption as HTMLOptionElement).selected).toBe(true);
      expect((incomingOption as HTMLOptionElement).selected).toBe(false);
      expect((outgoingOption as HTMLOptionElement).selected).toBe(false);
    });
  });

  it('should have the mocked transactions data', async () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />, mockedHistory);

    await waitFor(() => {
      const transactionsList = getAllByTestId('transaction');
      expect(transactionsList).toHaveLength(mockedTransactions.length);

      for (const trx of mockedTransactions) {
        const element = getByTestId(`transaction-${trx.id}-value`);
        expect(element).toBeInTheDocument();
      }
    });
  });

  it('should filter the incoming mocked transactions data', async () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />, mockedHistory);

    const incomingTransactions = mockedTransactions.filter(({ type }) => type === 'incoming');

    await waitFor(() => {
      const typeInput = getByTestId('type-input');
      fireEvent.change(typeInput, { target: { value: 'incoming' } });

      const transactionsList = getAllByTestId('transaction');
      expect(transactionsList).toHaveLength(incomingTransactions.length);

      for (const trx of incomingTransactions) {
        const element = getByTestId(`transaction-${trx.id}-value`);
        expect(element).toBeInTheDocument();
      }
    });
  });

  it('should filter the outgoing mocked transactions data', async () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />, mockedHistory);

    const outgoingTransactions = mockedTransactions.filter(({ type }) => type === 'outgoing');

    await waitFor(() => {
      const typeInput = getByTestId('type-input');
      fireEvent.change(typeInput, { target: { value: 'outgoing' } });

      const transactionsList = getAllByTestId('transaction');
      expect(transactionsList).toHaveLength(outgoingTransactions.length);

      for (const trx of outgoingTransactions) {
        const element = getByTestId(`transaction-${trx.id}-value`);
        expect(element).toBeInTheDocument();
      }
    });
  });

  it('should delete mocked transaction', async () => {
    const { mockedUseTransaction, deleteFunction } = mockUseTransaction();

    const { history, getByTestId, getAllByTestId, queryByTestId } = renderWithRouter(<App />, mockedHistory);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/list');

      const element = getByTestId(`transaction-${mockedTransactions[0].id}-value`);
      expect(element).toBeInTheDocument();

      const transactionsList = getAllByTestId('transaction');
      expect(transactionsList).toHaveLength(mockedTransactions.length);
    });

    await waitFor(() => {
      const deleteTransactionButton = getByTestId(`delete-transaction-${mockedTransactions[0].id}-button`);
      fireEvent.click(deleteTransactionButton);
    });

    await waitFor(() => {
      const element = queryByTestId(`transaction-${mockedTransactions[0].id}-value`);
      expect(element).not.toBeInTheDocument();

      const transactionsList = getAllByTestId('transaction');
      expect(transactionsList).toHaveLength(mockedTransactions.length - 1);

      expect(mockedUseTransaction).toHaveBeenCalled();

      expect(deleteFunction).toHaveBeenCalled();
      expect(deleteFunction).toHaveBeenCalledTimes(1);
    });
  });
});
