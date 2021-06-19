import React from 'react';
import renderWithRouter from './renderWithRouter';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';

import { auth } from '../services/firebase';

import { logUser } from './actions';
import { createMemoryHistory } from 'history';

describe('Login page', () => {
  const mockedUser = { email: 'admin@algoritme.com' };
  const mockedHistory = createMemoryHistory();
  mockedHistory.push('/login');

  afterAll(() => jest.clearAllMocks());

  it('should have the correct pathname', async () => {
    const { history } = renderWithRouter(<App />);
    
    await waitFor(() => {
      const expected = '/login';
      expect(history.location.pathname).toBe(expected);
    });
  });

  it('should contain the login label', async () => {
    const { getAllByText } = renderWithRouter(<App />);

    await waitFor(() => {
      const element = getAllByText(/Entrar/i);
      expect(element[0]).toBeInTheDocument();
    });
  });

  it('should contain the correct data-testid', async () => {
    const { getByTestId } = renderWithRouter(<App />);

    await waitFor(() => {
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const submitButton = getByTestId('submit-button');
  
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  it('should call the login function', async () => {
    const mockedSignIn = jest.spyOn(auth, 'signInWithEmailAndPassword');
    (mockedSignIn as jest.Mocked<any>).mockImplementation(() => Promise.resolve(mockedUser));
  
    renderWithRouter(<App />, mockedHistory);

    await waitFor(() => {
      logUser('admin@algoritme.com', 'algoritme', screen);

      expect(mockedSignIn).toHaveBeenCalled();
      expect(mockedSignIn).toHaveBeenCalledTimes(1);
    });

    mockedSignIn.mockReset();
  });
});
