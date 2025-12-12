import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.EXPO_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';

// Log API URL for debugging
console.log('[API Client] Using API URL:', API_URL);
if (API_URL.includes('localhost') || API_URL.includes('127.0.0.1')) {
  console.warn('[API Client] ⚠️ Using localhost - this will not work on physical devices. Use your computer\'s IP address instead.');
}

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000
});
