const BASE_URL_DEV = 'http://localhost:8080/api';
const BASE_URL_PROD = 'https://yasiruramosh-fybrggbjdrbqh2cr.canadacentral-01.azurewebsites.net/api';

const config = {
  development: {
    apiUrlAuth: `${BASE_URL_DEV}/auth`,
    apiUrlTasks: `${BASE_URL_DEV}/tasks`
  },
  production: {
    apiUrlAuth: `${BASE_URL_PROD}/auth`,
    apiUrlTasks: `${BASE_URL_PROD}/tasks`
  }
};

export const API_URL_TASK = window.location.hostname === 'localhost' 
  ? config.development.apiUrlTasks
  : config.production.apiUrlTasks;

export const API_URL_AUTH = window.location.hostname === 'localhost'
    ? config.development.apiUrlAuth
    : config.production.apiUrlAuth;
