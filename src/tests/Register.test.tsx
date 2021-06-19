import React from 'react';
import renderWithRouter from './renderWithRouter';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

import { auth } from '../services/firebase';

import { signUp } from './actions';
import { createMemoryHistory } from 'history';

describe('Register page', () => {
  const mockedUser = { email: 'admin@algoritme.com' };
  const mockedHistory = createMemoryHistory();
  mockedHistory.push('/register');

  it('should have the correct pathname', async () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    
    await waitFor(() => {
      const expected = '/register';

      const signUpButton = getByTestId('register-link');
      fireEvent.click(signUpButton);

      expect(history.location.pathname).toBe(expected);
    });
  });

  it('should contain the register label', async () => {
    const { getAllByText } = renderWithRouter(<App />, mockedHistory);

    await waitFor(() => {
      const element = getAllByText(/Registrar/i);
      expect(element[0]).toBeInTheDocument();
    });
  });

  it('should contain the correct data-testid', async () => {
    const { getByTestId } = renderWithRouter(<App />, mockedHistory);

    await waitFor(() => {
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const confirmPasswordInput = getByTestId('confirm-password-input');
      const submitButton = getByTestId('submit-button');
  
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  it('should call login function', async () => {
    const mockedSignUn = jest.spyOn(auth, 'createUserWithEmailAndPassword');
    (mockedSignUn as jest.Mocked<any>).mockImplementation(() => Promise.resolve(mockedUser));
  
    renderWithRouter(<App />, mockedHistory);

    await waitFor(() => {
      signUp('admin@algoritme.com', 'algoritme', screen);

      expect(mockedSignUn).toHaveBeenCalled();
      expect(mockedSignUn).toHaveBeenCalledTimes(1);
    });

    mockedSignUn.mockReset();
  });
});
