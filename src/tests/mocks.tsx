import { TransactionProps } from '../contexts/TransactionContext';

export const user = { email: 'admin@algoritme.com' };

export const transactions: TransactionProps[] = [
  { id: '1', type: 'incoming', user: 'admin@algoritme.com', value: 15.25 },
  { id: '2', type: 'incoming', user: 'admin@algoritme.com', value: 7 },
  { id: '3', type: 'outgoing', user: 'admin@algoritme.com', value: 85 },
  { id: '4', type: 'incoming', user: 'admin@algoritme.com', value: 0.7 },
  { id: '5', type: 'incoming', user: 'admin@algoritme.com', value: 75 },
  { id: '6', type: 'outgoing', user: 'admin@algoritme.com', value: 0.75 },
];
