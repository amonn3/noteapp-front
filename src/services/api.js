import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter();

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true
})

// Simplificando os interceptors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      router.push('/signin');
    }
    return Promise.reject(error);
  }
)

export default api