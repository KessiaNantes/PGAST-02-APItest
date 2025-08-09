# API de Transferências

Esta API permite realizar registro, login, consulta de usuários e transferências de valores entre usuários, com regras básicas de negócio. O banco de dados é em memória.

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express
   ```

## Como executar

- Para iniciar o servidor:
  ```powershell
  node server.js
  ```
- Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

- `POST /register`: Registra novo usuário. Campos obrigatórios: `username`, `password`. Opcional: `favorecidos` (array de usernames).
- `POST /login`: Realiza login. Campos obrigatórios: `username`, `password`.
- `GET /users`: Lista todos os usuários.
- `POST /transfer`: Realiza transferência. Campos obrigatórios: `from`, `to`, `amount`.
- `GET /transfers`: Lista todas as transferências.

## Regras de Negócio

- Não é permitido registrar usuários duplicados.
- Login exige informar usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.

## Testes

Para testar a API com Supertest, importe o `app.js` em seu arquivo de teste sem executar o método `listen()`.

---

API criada para fins de aprendizado de testes e automação.
