import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { TransactionProps, useTransaction } from '../../contexts/TransactionContext';

import {
  Header,
  Logout,
  TransactionCard,
  NewTransactionLink,
  Button
} from '../../components';

import TransactionGraph from './TransactionGraph';

const Dashboard: React.FC = () => {
  const [transactionsList, setTransactionsList] = useState<TransactionProps[]>([]);
  const [incoming, setIncoming] = useState<number>(0.0);
  const [outgoing, setOutgoing] = useState<number>(0.0);

  const { transactions } = useTransaction();
  const { currentUser } = useAuth();

  const history = useHistory();

  useEffect(() => {
    setTransactionsList(transactions
      .filter(({ user }) => user === currentUser?.email)
      .sort((a, b) => {
        return (b?.createdAt?.getTime() || new Date().getTime())
          - (a?.createdAt?.getTime() || new Date().getTime())
      }).slice(0, 5)
    );
  }, [currentUser?.email, transactions]);

  useEffect(() => {
    setIncoming(transactionsList
      .filter(({ type }) => type === 'incoming')
      .reduce((acc, curr) => acc + curr.value, 0)
    );

    setOutgoing(transactionsList
      .filter(({ type }) => type === 'outgoing')
      .reduce((acc, curr) => acc + curr.value, 0)
    );
  }, [transactionsList]);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <section className="w-full flex flex-col lg:flex-row">
        <TransactionGraph balance={incoming - outgoing} />
        <section className="w-full">
          <section className="lg:px-4 lg:mr-4 pt-8 pb-3">
            <article className="bg-white lg:rounded-lg p-4 shadow">
              <h1 className="font-bold text-xl text-gray-700 leading-tight my-2">
                Entradas:
                <span className="text-green-500">{` R$ ${incoming.toFixed(2)}`}</span>
            </h1>
              <h1 className="font-bold text-xl text-gray-700 leading-tight my-2">
                Saídas:
                <span className="text-red-500">{` R$ ${outgoing.toFixed(2)}`}</span>
              </h1>
            </article>
          </section>
          <NewTransactionLink />
        </section>
      </section>
      <section className="w-full">
        <section className="lg:px-4 lg:mx-4 py-3 lg:pt-8 lg:pb-3">
          <article className="bg-white lg:rounded-lg p-4 shadow">
            <h1 className="font-semibold text-xl text-gray-800 leading-tight my-2">Últimas Transações</h1>
            {!transactionsList.length && <p className="text-gray-400">Nenhuma transação no momento</p>}
            {transactionsList.map((trx) => (
              <TransactionCard
                key={trx.id}
                transaction={trx}
              />
            ))}
            <Button
              onClick={() => history.push('/list')}
              background="bg-purple-800"
              hover="hover:bg-purple-700"
              color="text-white"
              type="button"
              data-testid="list-transaction-link"
              customStyle="px-5 py-2 rounded block w-full mt-4"
            >
              Ver Mais
            </Button>
          </article>
        </section>
        <Logout />
      </section>
    </main>
  );
};

export default Dashboard;
