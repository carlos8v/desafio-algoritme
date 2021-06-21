import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useTransaction } from '../../contexts/TransactionContext';

import { Header, Button, Label, Input, ComboBox } from '../../components';

const NewTransaction: React.FC = () => {
  const [type, setType] = useState<string>('incoming');
  const [value, setValue] = useState<string>('0.00');

  const [loading, setLoaging] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { currentUser } = useAuth();
  const { add: addTrx } = useTransaction();

  const history = useHistory();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    setLoaging(true);
    try {
      await addTrx(type, currentUser?.email || '', parseFloat(value));
      return history.push('/');
    } catch (error) {
      setError('Erro ao criar nova transação');
    }

    setLoaging(false);
  }

  function handleChangeType(e: React.ChangeEvent<HTMLSelectElement>) {
    const validTypes = ['incoming', 'outgoing'];
    setType(validTypes.find((type) => type === e.target.value) || 'incoming');
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <section className="w-full md:max-w-2xl md:px-4 md:mx-auto pt-8 pb-3">
        <form className="bg-white md:rounded-lg p-4 shadow" onSubmit={handleSubmit}>
          <h1 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Nova Transação</h1>
          <div className="mb-4">
            <Label htmlFor="type">Tipo:</Label>
            <ComboBox
              id="type"
              onChange={handleChangeType}
              data-testid="type-input"
              options={[
                { text: 'Entrada', value: 'incoming', isDefault: true, dataTestId: 'incoming-option' },
                { text: 'Saída', value: 'outgoing', dataTestId: 'outgoing-option' }
              ]}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="value">Valor:</Label>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              name="value"
              id="value"
              min="0.01"
              step="0.01"
              data-testid="value-input"
              required
            />
          </div>
          <p className="text-sm text-red-500 mb-3">{error}</p>
          <Button
            background="bg-purple-800"
            hover="hover:bg-purple-700"
            color="text-white"
            type="submit"
            data-testid="submit-button"
            disabled={loading}
          >
            Salvar
          </Button>
          <Link
            to="/"
            className="mx-auto block px-2 py-1 mt-4 text-sm text-gray-600 hover:text-gray-700 transition ease-in-out duration-150 text-center"
            data-testid="dashboard-link"
          >
            Voltar
          </Link>
        </form>
      </section>
    </main>
  );
};

export default NewTransaction;
