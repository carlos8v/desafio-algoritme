import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const Header: React.FC<{ title?: string; path?: string; }> = ({
  title = 'Dashboard',
  path = '/'
}) => {
  const { currentUser } = useAuth();

  return (
    <header className="px-4 py-2 bg-purple-800 h-16 shadow">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link
          to={path}
          className="font-semibold text-xl text-white leading-tight"
        >
          {title}
        </Link>
        <p className="hidden md:block text-gray-100">{currentUser?.email}</p>
      </nav>
    </header>
  );
};

export default Header;
