import React from 'react';

import { TransactionProps } from '../../contexts/TransactionContext';

const TransactionCard: React.FC<{
  transaction: TransactionProps,
  last: boolean
}> = ({ transaction, last }) => {
  const types = {
    incoming: 'Entrada',
    outgoing: 'Saída',
  };

  const style = {
    incoming: 'text-green-500',
    outgoing: 'text-red-500',
  }

  return (
    <div data-testid="transaction">
      <strong className="text-gray-600">{`${types[transaction.type]}`}</strong>
      <span className="text-gray-600 text-sm">{` - ${transaction.createdAt.toLocaleString('pt-BR')}`}</span>
      <p className="text-gray-700" data-testid={`transaction-${transaction.id}-value`}>
        Valor:
        <span className={`${style[transaction.type]}`}>
          {` R$: ${transaction.value.toFixed(2)}`}
        </span>
      </p>
      {!last && <span className="block w-full my-2 border border-gray-100"></span>}
    </div>
  );
};

export default TransactionCard;
