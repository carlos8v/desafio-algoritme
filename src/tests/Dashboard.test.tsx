import React from 'react';
import renderWithRouter from './renderWithRouter';
import { waitFor } from '@testing-library/react';
import App from '../App';

import { mockCheckLoggedUser, mockGetTransactions } from './actions';

import { transactions } from './mocks';

describe('Dashboard page', () => {
  beforeEach(() => {
    mockCheckLoggedUser();
    mockGetTransactions(transactions);
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
      const dashboardTitle = getByText(/Dashboard/i);
      const loggedEmail = getByText(/admin@algoritme.com/i);

      expect(dashboardTitle).toBeInTheDocument();
      expect(loggedEmail).toBeInTheDocument();
    });
  });

  it('should have the mocked transactions data', async () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

    await waitFor(() => {
      const transactionsList = getAllByTestId('transaction');
      expect(transactionsList).toHaveLength(transactions.length);

      for (const trx of transactions) {
        const element = getByTestId(`transaction-${trx.id}-value`);
        expect(element).toBeInTheDocument();
      }
    });
  });
});
