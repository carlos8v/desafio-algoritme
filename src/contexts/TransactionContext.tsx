import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../services/firebase';

export interface TransactionProps {
  id: string;
  type: 'incoming' | 'outgoing';
  user: string;
  value: number;
};

interface TransactionContextProps {
  transactions: TransactionProps[];
  add: (type: 'incoming' | 'outgoing', user: string, value: number) => void;
  delete: (id: string) => void;
}

const TransactionContext = createContext<TransactionContextProps>({
  transactions: [],
  add: (type: 'incoming' | 'outgoing', user: string, value: number) => {},
  delete: (id: string) => {},
});

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = db.onSnapshot((data) => {
      setTransactions(data.docs.map(trx => {
        const { type, user, value } = trx.data();
        return { id: trx.id, type, user, value };
      }));    
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function addTransaction(type: 'incoming' | 'outgoing', user: string, value: number) {
    await db.add({
      type,
      user,
      value,
    });
  };

  async function deleteTransaction(id: string) {
    await db.doc(id).delete();
  }

  const value = {
    transactions,
    add: addTransaction,
    delete: deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {!loading && children}
    </TransactionContext.Provider>
  );
};
