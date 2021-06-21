import React, { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { TransactionProps, useTransaction } from '../../contexts/TransactionContext';

import {
  Header,
  TransactionCard,
  NewTransactionLink,
  Logout,
  Label,
  ComboBox,
  Button,
} from '../../components';

const TransactionList: React.FC = () => {
  const [transactionsList, setTransactionsList] = useState<TransactionProps[]>([]);
  const [type, setType] = useState<string>('all');

  const { currentUser } = useAuth();
  const { transactions } = useTransaction();

  useEffect(() => {
    setTransactionsList(transactions
      .filter(({ user }) => user === currentUser?.email)
      .filter((trx) => {
        const validTypes = ['all', 'incoming', 'outgoing'];
        if (type === 'all' || !validTypes.find((validType) => validType === type))
          return true;
        
        return trx.type === type;
      })
      .sort((a, b) => {
        return (b?.createdAt?.getTime() || new Date().getTime())
          - (a?.createdAt?.getTime() || new Date().getTime())
      })
    )
  }, [currentUser?.email, transactions, type]);

  function handleChangeType(e: React.ChangeEvent<HTMLSelectElement>) {
    const validTypes = ['all', 'incoming', 'outgoing'];
    setType(validTypes.find((type) => type === e.target.value) || 'all');
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <NewTransactionLink width="w-full md:max-w-2xl md:px-4 md:mx-auto pt-8 pb-3" />
      <section className="w-full md:max-w-2xl md:px-4 md:mx-auto py-3">
        <article className="bg-white md:rounded-lg p-4 shadow">
        <Label htmlFor="type">Filtrar:</Label>
        <ComboBox
          id="type"
          onChange={handleChangeType}
          data-testid="type-input"
          options={[
            { text: 'Todos', value: 'all', isDefault: true, dataTestId: 'all-option' },
            { text: 'Entrada', value: 'incoming', dataTestId: 'incoming-option' },
            { text: 'Saída', value: 'outgoing', dataTestId: 'outgoing-option' }
          ]}
        />
        </article>
      </section>
      <section className="w-full md:max-w-2xl md:px-4 md:mx-auto py-3">
        <article className="bg-white md:rounded-lg p-4 shadow">
        {transactionsList.map((trx, index) => (
          <TransactionCard
            key={trx.id}
            transaction={trx}
            last={index === transactionsList.length - 1}
          >
            <Button
              onClick={() => {}}
              hover="hover:text-red-600"
              color="text-gray-700"
              type="button"
              data-testid="delete-transaction-button"
              customStyle="block mt-2 mb-4 text-sm"
            >
              Deletar
            </Button>
          </TransactionCard>
        ))}
        </article>
      </section>
      <Logout />
    </main>
  );
};

export default TransactionList;
