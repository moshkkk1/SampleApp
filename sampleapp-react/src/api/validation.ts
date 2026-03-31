import axios from 'axios';

const API_URL = 'http://localhost:5197/api';

export const checkLoginUnique = async (login: string) => {
  try {
    const response = await axios.get(`${API_URL}/Users/check-login?login=${login}`);
    return response.data.isUnique;
  } catch (error) {
    console.error('Error checking login uniqueness:', error);
    return false;
  }
};