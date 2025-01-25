import axios from 'axios';

// Set base URL based on environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://medical-service-8f3zbu0r7-rabitas-projects.vercel.app'  // Production URL
  : 'http://localhost:5001';  // Development URL

// Create axios instance with default config
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Important for handling cookies/sessions
});

// Add request interceptor to handle auth token
instance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('userInfo');
          window.location.href = '/login';
          break;
        case 405:
          console.error('Method not allowed. Please check API endpoint and method:', {
            url: error.config.url,
            method: error.config.method
          });
          break;
        case 404:
          console.error('Resource not found:', {
            url: error.config.url
          });
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error - No response received');
    }
    return Promise.reject(error);
  }
);

export default instance; 