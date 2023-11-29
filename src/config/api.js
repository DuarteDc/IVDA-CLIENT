import axios from 'axios';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  responseType: 'json',
  headers: {
    "Content-Type": "application/json"
  }
});

apiInstance.interceptors.request.use(
  async config => {
    try {
      const session = localStorage.getItem('session');
      if (session) config.headers.session = JSON.parse(session);
      return config;
    } catch (error) {
      localStorage.removeItem('session');
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export const apiDownload = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  responseType: 'blob',
});

apiDownload.interceptors.request.use(
  async config => {
    try {
      const session = localStorage.getItem('session');
      if (session) config.headers.session = JSON.parse(session);
      return config;
    } catch (error) {
      localStorage.removeItem('session');
    }
  },
  error => {
    return Promise.reject(error)
  }
)


export default apiInstance;