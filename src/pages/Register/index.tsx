import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { Button, Input, Label } from '../../components';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { signup } = useAuth();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (confirmPassword !== password) {
      return setError('Passwords doesn\'t match');
    }

    const minLength = 8;
    if (password.length < minLength) {
      return setError(`Senha deve ter pelo menos ${minLength} caracteres`);
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
    } catch {
      setError('Falha ao criar a conta');
    }

    setLoading(false);
  }

  return (
    <section className="min-h-screen flex flex-col sm:justify-center items-center pt-10 sm:pt-0 bg-purple-700">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-md mt-6 px-6 py-7 bg-white shadow-md overflow-hidden sm:rounded-lg"
      >
        <h1 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Registro</h1>
        <div className="mb-4">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            required
            autoComplete="off"
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
        <div className="mb-4">
          <Label htmlFor="confirm-password">Confirmar senha:</Label>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirm-password"
            id="confirm-password"
            data-testid="confirm-password-input"
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
          Registrar
        </Button>        
        <Link
          to="/login"
          className="mx-auto block px-2 py-1 mt-4 text-sm text-gray-600 hover:text-gray-700 transition ease-in-out duration-150"
          style={{ maxWidth: 'fit-content' }}
        >
          Entrar
        </Link>
      </form>
    </section>
  );
}

export default Register;
