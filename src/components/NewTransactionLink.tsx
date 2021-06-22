import React from "react";
import { Link } from 'react-router-dom';

const NewTransactionButton: React.FC<{ width?: string; }> = ({ width = ''}) => {
  const customWidth = width ? width : 'lg:pr-4 lg:mx-4 py-3';

  return (
    <section className={customWidth}>
      <Link
        to="/new"
        data-testid="new-transaction-link"
        className="block hover:underline lg:hover:no-underline lg:border lg:border-dashed lg:border-gray-400 hover:border-gray-500 lg:rounded-lg p-4 transition ease-in-out duration-150 text-gray-600 hover:text-gray-700"
      >
        Nova Transação
      </Link>
    </section>
  )
};

export default NewTransactionButton;
