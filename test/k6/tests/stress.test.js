import { check, group, sleep } from 'k6';
import { USERNAME, PASSWORD } from '../config.js';
import { loginUser } from '../requests/api.request.js';

export let options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<2000'],
  },
};

export default function () {
  group('Stress Test - Login', () => {
    const res = loginUser(USERNAME, PASSWORD);

    check(res, {
      'login retorna 200 ou 401': (r) =>
        r.status === 200 || r.status === 401,
    });

    sleep(0.5);
  });
}
