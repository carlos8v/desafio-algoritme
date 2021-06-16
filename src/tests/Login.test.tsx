import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Login page', () => {
  it('should have the correct pathname', async () => {
    const { history } = renderWithRouter(<App />);
    const expected = '/';

    expect(history.location.pathname).toBe(expected);
  });

  it('should contain the Login label', () => {
    const { getByText } = renderWithRouter(<App />);

    const element = getByText(/Login/i);
    expect(element).toBeInTheDocument();
  });

  it('should contain the correct data-testid', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('submit-button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
