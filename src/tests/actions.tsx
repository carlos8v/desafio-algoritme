import { Screen, fireEvent } from '@testing-library/react';

export const logUser = (email: string, password: string, screen: Screen) => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  fireEvent.click(submitButton);
}

export const signUp = (email: string, password: string, screen: Screen) => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const confirmPasswordInput = screen.getByTestId('confirm-password-input');
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });

  fireEvent.click(submitButton);
}
