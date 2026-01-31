import http from 'k6/http';
import { BASE_URL } from '../config.js';
import { saveToken, getToken } from '../helpers/utils.js';

export function registerUser(username, password) {
  return http.post(
    `${BASE_URL}/register`,
    JSON.stringify({ username, password, favorecidos: [] }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

export function loginUser(username, password) {
  const res = http.post(
    `${BASE_URL}/login`,
    JSON.stringify({ username, password }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  if (res.status === 200 && res.json('token')) {
    saveToken(res.json('token'));
  }

  return res;
}

export function getUsers() {
  const token = getToken();
  return http.get(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function transfer(from, to, amount) {
  const token = getToken();
  return http.post(
    `${BASE_URL}/transfer`,
    JSON.stringify({ from, to, amount }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getTransfers() {
  const token = getToken();
  return http.get(`${BASE_URL}/transfers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
