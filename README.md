# Desafio [Algoritme](https://www.linkedin.com/company/algoritme-ltda/)

## Objetivo 🚀️
Sistema de visualizações de finanças. Possuindo os seguintes requisitos:

- Telas:
  - Tela de Login;
  - Tela de Cadastro;
  - Dashboard;
  - Tela de Listagem;
  - Tela de Criação de lançamentos;
- Funcionalidades
  - Autenticação usuários;
  - Criação de lançamentos;
  - Exclusão de lançamentos;
  - Filtragem por tipo (entrada e saída);
  - Dashboard com total de entradas e saídas.

### Tecnologias e Metodologias ⚙️
- React com Typescript;
- Firebase;
- TDD.

### Como testar 🔧️
Clone o projeto e instale as dependências:
```bash
# com npm
npm install

# com Yarn
yarn install
```

Crie um arquivo `.env` seguindo o formato descrito no arquivo `.env.example`:
```dosini
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_IR=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
```

Inicialize a aplicação:
```bash
# com npm
npm start

# com Yarn
yarn start
```

Você pode rodar os testes com:
```bash
# com npm
npm test

# com Yarn
yarn test
```
