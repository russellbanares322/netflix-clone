import axios from 'axios';

const config = {
  Headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain' },
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  https: config,
});

export default instance;
