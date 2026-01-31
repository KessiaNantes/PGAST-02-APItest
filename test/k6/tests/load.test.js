import { check, group, sleep } from 'k6';
import { STAGES, USERNAME, PASSWORD } from '../config.js';
import {
  randomUsername,
  randomPassword,
  loginTrend,
  registerTrend,
  transferTrend,
} from '../helpers/utils.js';
import {
  registerUser,
  loginUser,
  getUsers,
  transfer,
  getTransfers,
} from '../requests/api.request.js';
import payloads from '../data/payloads.json';

export let options = {
  stages: STAGES,
  thresholds: {
    http_req_duration: ['p(95)<800'],
    login_duration: ['avg<500'],
    register_duration: ['avg<700'],
    transfer_duration: ['avg<700'],
  },
};

export default function () {
  group('User Registration (Data-Driven)', () => {
    const user =
      payloads[Math.floor(Math.random() * payloads.length)] || {
        username: randomUsername(),
        password: randomPassword(),
      };

    const res = registerUser(user.username, user.password);
    registerTrend.add(res.timings.duration);

    check(res, {
      'cadastro retorna 201 ou 400': (r) =>
        r.status === 201 || r.status === 400,
    });

    sleep(1);
  });

  group('User Login', () => {
    const res = loginUser(USERNAME, PASSWORD);
    loginTrend.add(res.timings.duration);

    check(res, {
      'login retorna 200 ou 401': (r) =>
        r.status === 200 || r.status === 401,
    });

    sleep(1);
  });

  group('Get Users (Token)', () => {
    const res = getUsers();

    check(res, {
      'listar usuários retorna 200': (r) => r.status === 200,
    });

    sleep(1);
  });

  group('Transferência', () => {
    const res = transfer(USERNAME, 'user2', Math.floor(Math.random() * 100) + 1);
    transferTrend.add(res.timings.duration);

    check(res, {
      'transferência retorna 201 ou 400': (r) =>
        r.status === 201 || r.status === 400,
    });

    sleep(1);
  });

  group('Get Transfers', () => {
    const res = getTransfers();

    check(res, {
      'listar transferências retorna 200': (r) => r.status === 200,
    });

    sleep(1);
  });
}
