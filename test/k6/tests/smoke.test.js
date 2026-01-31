import { check, group } from 'k6';
import { USERNAME, PASSWORD } from '../config.js';
import { loginUser } from '../requests/api.request.js';

import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.3/index.js';

export let options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  group('Smoke Test - Login', () => {
    const res = loginUser(USERNAME, PASSWORD);

    check(res, {
      'login retorna 200 ou 401': (r) =>
        r.status === 200 || r.status === 401,
    });
  });
}

export function handleSummary(data) {
  return {
    'relatorio-perfomance.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
