const config = {
  API_URL: window.env?.REACT_APP_API_URL || 'http://localhost:5001',
  NODE_ENV: window.env?.NODE_ENV || 'development',
  PUBLIC_URL: window.env?.PUBLIC_URL || '/',
  PRODUCTION_API_URL: window.env?.REACT_APP_PRODUCTION_API_URL || 'https://medical-service-backend-eg8t.onrender.com'
};

export default config; 