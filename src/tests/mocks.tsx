import { TransactionProps } from '../contexts/TransactionContext';

export const mockedUser = { email: 'admin@algoritme.com' };

export const mockedTransactions: TransactionProps[] = [
  { id: '1', type: 'incoming', user: 'admin@algoritme.com', value: 15.25, createdAt: new Date('06/18/2021 15:19') },
  { id: '2', type: 'incoming', user: 'admin@algoritme.com', value: 7, createdAt: new Date('06/19/2021 12:30') },
  { id: '3', type: 'outgoing', user: 'admin@algoritme.com', value: 85, createdAt: new Date('06/19/2021 13:36') },
  { id: '4', type: 'incoming', user: 'admin@algoritme.com', value: 0.7, createdAt: new Date('06/19/2021 22:01') },
  { id: '5', type: 'incoming', user: 'admin@algoritme.com', value: 75, createdAt: new Date('06/19/2021 23:42') },
  { id: '6', type: 'outgoing', user: 'admin@algoritme.com', value: 0.75, createdAt: new Date('06/19/2021 23:49') },
];

export const mockedNewTransaction: TransactionProps = {
  id: '7',
  type: 'incoming',
  user: 'admin@algoritme.com',
  value: 9.99,
  createdAt: new Date('06/20/2021 04:18'),
};
