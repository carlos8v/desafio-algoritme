import React, { useEffect, useState } from 'react';

import { useTransaction } from '../../contexts/TransactionContext';
import { Header, Logout } from '../../components';

const Dashboard: React.FC = () => {
  const [incoming, setIncoming] = useState<number>(0.0);
  const [outgoing, setOutgoing] = useState<number>(0.0);

  const { transactions } = useTransaction();

  useEffect(() => {
    setIncoming(transactions
      .filter(({ type }) => type === 'incoming')
      .reduce((acc, curr) => acc + curr.value, 0)
    );

    setOutgoing(transactions
      .filter(({ type }) => type === 'outgoing')
      .reduce((acc, curr) => acc + curr.value, 0)
    );
  }, [transactions]);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <section className="w-full md:max-w-sm sm:px-4 sm:mx-4 pt-8 pb-3">
        <article className="bg-white sm:rounded-lg p-4 shadow">
          <h1 className="font-bold text-xl text-gray-700 leading-tight my-2">
            Entradas:
            <span className="text-green-500">{` R$ ${incoming.toFixed(2)}`}</span>
        </h1>
          <h1 className="font-bold text-xl text-gray-700 leading-tight my-2">
            Saídas:
            <span className="text-red-500">{` R$ ${outgoing.toFixed(2)}`}</span>
          </h1>
          <h1 className="font-semibold text-lg text-gray-600 mt-4 mb-2">{`Balanço: R$ ${(incoming - outgoing).toFixed(2)}`}</h1>
        </article>
      </section>
      <section className="w-full md:max-w-sm sm:px-4 sm:mx-4 py-3">
        <article className="bg-white sm:rounded-lg p-4 shadow">
          <h1 className="font-semibold text-xl text-gray-800 leading-tight my-2">Últimas Transações</h1>
          {!transactions.length && (
            <p className="text-gray-400">Nenhuma transação no momento</p>
          )}
          {transactions.map((trx, index) => {
            const types = {
              incoming: 'Entrada',
              outgoing: 'Saída',
            };

            const style = {
              incoming: 'text-green-500',
              outgoing: 'text-red-500',
            }

            return (
              <div key={trx.id} data-testid="transaction">
                <strong className="text-gray-600">{`${types[trx.type]}`}</strong>
                <p className="text-gray-700" data-testid={`transaction-${trx.id}-value`}>
                  Valor:
                  <span className={`${style[trx.type]}`}>
                    {` R$: ${trx.value.toFixed(2)}`}
                  </span>
                </p>
                {index !== transactions.length - 1 && <span className="block w-full my-2 border border-gray-100"></span>}
              </div>
            );
          })}
        </article>
      </section>
      <Logout />  
    </main>
  );
};

export default Dashboard;
