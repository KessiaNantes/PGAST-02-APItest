// Configurações globais para os testes k6
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
export const USERNAME = __ENV.USERNAME || 'testuser';
export const PASSWORD = __ENV.PASSWORD || 'test123';
export const STAGES = [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 },
];
