import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://medical-service-backend-eg8t.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
instance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
instance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('No response received');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance; 