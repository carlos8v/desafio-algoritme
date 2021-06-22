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
    <section className="lg:px-4 lg:mx-4 py-3 lg:py-3">
      <button
        type="button"
        className="mx-auto block px-2 py-1 my-4 text-base text-gray-600 hover:text-gray-700 hover:underline transition ease-in-out duration-150"
        onClick={handleLogout}
      >
        Sair
      </button>
    </section>
  );
};

export default Logout;
