import axios from 'axios';

const API_URL = 'http://localhost:5197/api';

export const login = async (login: string, password: string) => {
  const response = await axios.post(`${API_URL}/Users/Login`, { login, password });
  return response.data;
};

export const register = async (data: { login: string; password: string; name?: string }) => {
  const response = await axios.post(`${API_URL}/Users`, data);
  return response.data;
};