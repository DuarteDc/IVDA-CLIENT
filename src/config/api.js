import axios from 'axios';

export const instanceApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  responseType: 'json',
  headers: {
    "token": localStorage.getItem('session') || ''
  }
});