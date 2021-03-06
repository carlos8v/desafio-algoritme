import React from 'react';
import renderWithRouter from './renderWithRouter';
import { waitFor } from '@testing-library/react';
import App from '../App';

import { mockUseAuth, mockFirestoreOnSnapshot } from './actions';

import { mockedTransactions } from './mocks';

describe('Dashboard page', () => {
  beforeEach(() => {
    mockUseAuth();
    mockFirestoreOnSnapshot();
  });  

  afterEach(() => jest.clearAllMocks());
  
  it('should have the correct pathname', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(() => {
      const expected = '/';
      expect(history.location.pathname).toBe(expected);
    });
  });

  it('should have the correct user info', async () => {
    const { getByText } = renderWithRouter(<App />);

    await waitFor(() => {
      const loggedEmail = getByText(/admin@algoritme.com/i);
      expect(loggedEmail).toBeInTheDocument();
    });
  });

  it('should contain the correct data-testid', async () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    
    await waitFor(() => {
      const dashboardTitle = getByText(/Dashboard/i);

      const newTransactionLink = getByTestId('new-transaction-link');
      const listTransactionLink = getByTestId('list-transaction-link');
  
      expect(dashboardTitle).toBeInTheDocument();
      expect(newTransactionLink).toBeInTheDocument();
      expect(listTransactionLink).toBeInTheDocument();
    });
  });

  it('should have the mocked transactions data', async () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

    await waitFor(() => {
      const transactionsList = getAllByTestId('transaction');
      const maxLastTransactionsLength = 5;
      expect(transactionsList).toHaveLength(maxLastTransactionsLength);

      for (const trx of mockedTransactions.slice(0, maxLastTransactionsLength)) {
        const element = getByTestId(`transaction-${trx.id}-value`);
        expect(element).toBeInTheDocument();
      }
    });
  });
});
