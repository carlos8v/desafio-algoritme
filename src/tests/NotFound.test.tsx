import React from 'react';
import renderWithRouter from './renderWithRouter';
import { waitFor } from '@testing-library/react';
import App from '../App';

import { mockGetTransactions } from './actions';

describe('Not found page', () => {
  beforeEach(() => mockGetTransactions());
  afterEach(() => jest.clearAllMocks());

  it('should not exist in the page', async () => {
    const { queryByText } = renderWithRouter(<App />);
    await waitFor(() => {
      const element = queryByText(/404 - Página não encontrada/i);
      expect(element).not.toBeInTheDocument();
    });
  });

  it('should have the correct text', async () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/not-exists');
    await waitFor(() => {
      const element = getByText(/404 - Página não encontrada/i);
      expect(element).toBeInTheDocument();
    });
  });
});
