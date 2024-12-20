import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const AuthService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  signup: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await axios.post(`${API_URL}/reset-password`, { token, password });
    return response.data;
  },

  changePassword: async (userId, passwordData) => {
    const response = await axios.put(`${API_URL}/change-password/${userId}`, passwordData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  },

  decodeToken: (token) => {
    return JSON.parse(atob(token.split('.')[1]));
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
