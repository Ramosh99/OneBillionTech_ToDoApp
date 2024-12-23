import axios from 'axios';
import { API_URL_AUTH } from '../config/config';


export const AuthService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL_AUTH}/login`, credentials);
    return response.data;
  },

  signup: async (userData) => {
    const response = await axios.post(`${API_URL_AUTH}/register`, userData);
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await axios.post(`${API_URL_AUTH}/reset-password`, { token, password });
    return response.data;
  },

  changePassword: async (userId, passwordData) => {
    const response = await axios.put(`${API_URL_AUTH}/change-password/${userId}`, passwordData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL_AUTH}/forgot-password`, { email });
    return response.data;
  },

  decodeToken: (token) => {
    return JSON.parse(atob(token.split('.')[1]));//atob() function decodes a string of data which has been encoded using base-64 encoding
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  clearToken: () => {
    localStorage.removeItem('token');
  }
};

export default AuthService;
