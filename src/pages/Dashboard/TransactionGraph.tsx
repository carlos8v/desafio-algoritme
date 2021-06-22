import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';
import { useAuth } from '../../contexts/AuthContext';

import { useTransaction } from '../../contexts/TransactionContext';

const TransactionGraph: React.FC<{ balance: number }> = ({ balance }) => {
  const [transactionsBalance, setTransactionsBalance] = useState<number[]>([]);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  const { currentUser } = useAuth();
  const { transactions } = useTransaction();

  useEffect(() => {
    const transactionsByDay = new Map()
    const currentMonth = new Date().getMonth() + 1;

    transactions
      .filter(({ user }) => user === currentUser?.email)
      .filter((trx) => (trx.createdAt.getMonth() + 1) === currentMonth)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .forEach((trx) => {
        const day = trx.createdAt.getDate()
        if (!transactionsByDay.get(day)) transactionsByDay.set(day, []);
        transactionsByDay.get(day).push(trx.value * (trx.type === 'incoming' ? 1 : -1));
      });

    const balanceOverDays: number[] = [];
    transactionsByDay.forEach((trxs) => {
      balanceOverDays.push(trxs.reduce((acc: number, curr: number) => acc + curr, 0));
    });

    setTransactionsBalance(balanceOverDays);
    setMinValue(Math.min(...balanceOverDays));
    setMaxValue(Math.max(...balanceOverDays));
  }, [currentUser?.email, transactions]);

  const data = {
    responsive: true,
    labels: transactionsBalance.map(() => ''),
    datasets: [{
      data: transactionsBalance,
      borderColor: '#6D28D9',
      borderWidth: 5,
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
    }]
  };

  const options = {
    responsive: true,
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    scales: {
      x: { display: false, title: { display: false } },
      y: {
        display: true,
        title: { display: false },
        suggestedMin: minValue,
        suggestedMax: maxValue,
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <section className="w-full lg:max-w-2xl lg:px-4 lg:mx-4 pt-8 pb-3">
      <article className="bg-white lg:rounded-lg p-4 shadow">
        <h1 className="font-bold text-xl text-gray-700 leading-tight my-2">{`Balanço: R$ ${balance.toFixed(2)}`}</h1>
        <div>
          <Line
            type="line"
            width={400}
            height={300}
            data={data}
            options={options}
          />
        </div>
      </article>
    </section>
  );
};

export default TransactionGraph;
