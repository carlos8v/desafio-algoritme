import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { Button, Input, Label } from '../../components';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      return history.push('/');
    } catch (error) {
      setError('Falha ao se logar');
    }

    setLoading(false);
  }

  return (
    <section className="min-h-screen flex flex-col sm:justify-center items-center pt-10 sm:pt-0 bg-purple-700">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-md mt-6 px-6 py-7 bg-white shadow-md overflow-hidden sm:rounded-lg"
      >
        <h1 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Entrar</h1>
        <div className="mb-4">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Senha:</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
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
          Entrar
        </Button>
        <Link
          to="/register"
          className="mx-auto block px-2 py-1 mt-4 text-sm text-gray-600 hover:text-gray-700 transition ease-in-out duration-150"
          style={{ maxWidth: 'fit-content' }}
          data-testid="register-link"
        >
          Registrar
        </Link>
      </form>
    </section>
  );
}

export default Login;
