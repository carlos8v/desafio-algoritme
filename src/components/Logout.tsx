import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const Logout: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    history.push('/');
  }

  return (
    <button
      type="button"
      className="mx-auto block px-2 py-1 my-4 text-base text-gray-600 hover:text-gray-700 transition ease-in-out duration-150"
      style={{ maxWidth: 'fit-content' }}
      onClick={handleLogout}
    >
      Sair
    </button>
  );
};

export default Logout;
