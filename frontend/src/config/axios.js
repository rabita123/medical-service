import axios from 'axios';

// Create axios instance with default config
const instance = axios.create({
  baseURL: '/api',  // Use relative path for API calls
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
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