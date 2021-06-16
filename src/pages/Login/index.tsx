import React, { useState } from 'react';

import { Button, Input, Label } from '../../components';

const background = 'url(https://media-exp1.licdn.com/dms/image/C4E1BAQHliawufnJm9Q/company-background_10000/0/1562671743048?e=1623891600&v=beta&t=r23ab6Y5J2prkAWA-c1TCc4ybq0072IXkUofJSq1h88) center center / cover';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <section style={{ background }} className="min-h-screen flex flex-col sm:justify-center items-center pt-10 sm:pt-0">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-md mt-6 px-6 py-7 bg-white shadow-md overflow-hidden sm:rounded-lg"
      >
        <h1 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Login</h1>
        <div className="mb-4">
          <Label htmlFor="email">Email:</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">Password:</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
          />
        </div>
        <Button
          background="bg-purple-800"
          hover="hover:bg-purple-700"
          color="text-white"
          type="submit"
          data-testid="submit-button"
        >Log in</Button>
      </form>
    </section>
  );
}

export default Login;
