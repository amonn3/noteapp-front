import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true
})

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    // Tratamento de erros aqui
    return Promise.reject(error)
  }
)

export default api