import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, firebase } from '../services/firebase';

import { Loading } from '../components';

export interface TransactionProps {
  id: string;
  type: 'incoming' | 'outgoing';
  user: string;
  value: number;
  createdAt: Date;
};

interface TransactionContextProps {
  transactions: TransactionProps[];
  add: (type: string, user: string, value: number) => Promise<firebase.firestore.DocumentReference | void>;
  delete: (id: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextProps>({
  transactions: [],
  add: (type: string, user: string, value: number) => Promise.resolve(),
  delete: (id: string) => Promise.resolve(),
});

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = db.onSnapshot((data) => {
      setTransactions(data.docs.map(trx => {
        const { type, user, value, createdAt: serverTimestamp } = trx.data();
        return {
          id: trx.id,
          type,
          user,
          value,
          createdAt: serverTimestamp?.toDate() || new Date(),
        };
      }));    
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function addTransaction(type: string, user: string, value: number) {
    const createdAt = firebase.firestore.FieldValue.serverTimestamp()
    return db.add({
      type,
      user,
      value,
      createdAt,
    });
  };

  function deleteTransaction(id: string) {
    return db.doc(id).delete();
  }

  const value = {
    transactions,
    add: addTransaction,
    delete: deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {loading ? (<Loading />) : (children)}
    </TransactionContext.Provider>
  );
};
