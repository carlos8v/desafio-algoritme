import React from 'react';
import renderWithRouter from './renderWithRouter';
import { waitFor } from '@testing-library/react';
import App from '../App';

import * as authContext from '../contexts/AuthContext';

describe('Dashboard page', () => {
  const mockedUser = { email: 'admin@algoritme.com' };
  it('should be in the correct page', async () => {
    const mockedCheckUserLogged = jest.spyOn(authContext, 'useAuth');
    (mockedCheckUserLogged as jest.Mocked<any>).mockImplementation(() => ({
      currentUser: mockedUser,
    }));

    const { getByText } = renderWithRouter(<App />);

    await waitFor(() => {
      const dashboardTitle = getByText(/Dashboard/i);
      const loggedEmail = getByText(/admin@algoritme.com/i);

      expect(dashboardTitle).toBeInTheDocument();
      expect(loggedEmail).toBeInTheDocument();
    });

    mockedCheckUserLogged.mockReset();
  });
});
