import { Trend } from 'k6/metrics';
import faker from 'https://unpkg.com/faker@5.5.3/dist/faker.js';

export const loginTrend = new Trend('login_duration');
export const registerTrend = new Trend('register_duration');
export const transferTrend = new Trend('transfer_duration');

export function randomUsername() {
  return `user_${faker.random.alphaNumeric(8)}`;
}

export function randomPassword() {
  return faker.internet.password();
}

let authToken = null;

export function saveToken(token) {
  authToken = token;
}

export function getToken() {
  return authToken;
}
