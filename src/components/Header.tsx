import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <header className="px-4 py-2 bg-purple-800 h-16 shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <h1 className="font-semibold text-xl text-white leading-tight">Dashboard</h1>
        <p className="hidden sm:block text-gray-100">{currentUser?.email}</p>
      </nav>
    </header>
  );
};

export default Header;
