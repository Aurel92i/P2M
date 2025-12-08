import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.EXPO_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000
});
