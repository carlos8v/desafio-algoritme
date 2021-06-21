import React from "react";
import { Link } from 'react-router-dom';

const NewTransactionButton: React.FC = () => (
  <section className="w-full md:max-w-sm md:px-4 md:mx-4 py-3">
    <Link
      data-testid="new-transaction-link"
      to="/new"
      className="block hover:underline md:hover:no-underline md:border md:border-dashed md:border-gray-400 hover:border-gray-500 md:rounded-lg p-4 transition ease-in-out duration-150 text-gray-600 hover:text-gray-700"
    >
      Nova Transação
    </Link>
  </section>
);

export default NewTransactionButton;
