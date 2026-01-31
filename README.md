# Testes de Performance com k6

Este projeto realiza **testes de performance em uma API REST** utilizando a ferramenta **k6**, com foco acadêmico na aplicação prática dos conceitos de **smoke test**, **load test** e **stress test**, bem como na análise de métricas de desempenho.

---

## Estrutura de Pastas

- `tests/`: Scripts de teste (smoke, load, stress)
- `requests/`: Funções de requisição HTTP reutilizáveis
- `helpers/`: Utilitários, geração de dados, métricas e token
- `data/`: Arquivos de dados para testes data-driven
- `config.js`: Configurações globais e variáveis de ambiente


## Conceitos Aplicados e Onde Estão no Código

### Thresholds

Critérios objetivos de aceitação definidos em `options.thresholds` nos scripts de teste, permitindo validar automaticamente o desempenho da aplicação.

- `tests/load.test.js`
- `tests/stress.test.js`

Exemplo:
```js
thresholds: {
  http_req_duration: ['p(95)<800'],
}
```

### Checks

Validações funcionais mínimas aplicadas nos scripts de teste para verificar se as respostas HTTP estão dentro do comportamento esperado.

tests/*.test.js (uso da função check dentro dos grupos)

### Helpers

Funções auxiliares centralizadas em helpers/utils.js, responsáveis por:

geração de dados dinâmicos

encapsulamento de métricas customizadas

armazenamento e reutilização de token de autenticação

### Trends

Métricas customizadas criadas com Trend (k6/metrics) para medir o tempo médio de operações específicas, como:

login

cadastro de usuário

transferência

Definidas em helpers/utils.js

Utilizadas em tests/load.test.js

### Faker

Utilizado para geração de dados aleatórios por meio de import compatível com o runtime do k6, simulando cenários mais realistas de uso da aplicação.

helpers/utils.js

### Variáveis de Ambiente

As configurações utilizam __ENV para permitir a execução dos testes em diferentes ambientes.

config.js

Exemplo:

export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
export const USERNAME = __ENV.USERNAME || 'testuser';
export const PASSWORD = __ENV.PASSWORD || 'test123';

### Stages

Os testes de carga e estresse utilizam stages para simular crescimento e redução progressiva do número de usuários virtuais.

Definidos em config.js

Utilizados em tests/load.test.js e tests/stress.test.js

### Reaproveitamento de Resposta

As respostas HTTP retornadas pelas requisições são reutilizadas dentro do fluxo de teste para:

validações com check

extração de dados relevantes (ex: token de autenticação)

### Uso de Token de Autenticação

Após o login bem-sucedido, o token de autenticação é armazenado no escopo do usuário virtual (VU) e reutilizado automaticamente nas requisições subsequentes, sendo enviado no header Authorization.

Armazenamento em helpers/utils.js

Uso em requests/api.request.js


### Data-Driven Testing

Os testes utilizam massa de dados externa para execução orientada a dados, evitando hardcode de valores.

Arquivo: data/payloads.json

Uso em: tests/load.test.js

Exemplo:

[
  { "username": "user1", "password": "pass1" },
  { "username": "user2", "password": "pass2" },
  { "username": "user3", "password": "pass3" }
]

### Groups

Os cenários são organizados com group() para facilitar a leitura, análise e separação de métricas no relatório de execução.

tests/*.test.js

---

## Relatório de Execução do Teste em HTML

O relatório de execução em HTML é gerado automaticamente por meio da função nativa handleSummary do k6, implementada diretamente no script de teste (exemplo: smoke test).

O arquivo HTML é criado ao final da execução, sem a necessidade de ferramentas externas, arquivos intermediários ou comandos adicionais.

Exemplo de arquivo gerado:

```bash
relatorio-performance.html
```

O relatório apresenta:

total de requisições

checks executados

métricas de tempo (avg, p95, p99)

comportamento do sistema sob carga

organização por grupos de teste

## Como Executar

1. Instale as dependências:
   ```bash
npm i
   ```
2. Execute os testes e gere o relatório:
   ```bash
npm run k6:all
   ```