import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://ecosphere-backend-qty9.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Attach JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ecosphere_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle 401 globally (token expired)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ecosphere_token')
      localStorage.removeItem('ecosphere_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
