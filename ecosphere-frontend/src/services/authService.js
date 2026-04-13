import apiClient from './apiClient'

// --- Mock auth for frontend-only development ---
// When Spring Boot is running, these calls go to /api/auth/*
// Until then, we simulate with localStorage

const MOCK_USERS = [
  { id: 1, username: 'demo', email: 'demo@ecosphere.app', password: 'demo123' }
]

const isMockMode = () => {
  // Only use mock if explicitly set to 'true'
  return import.meta.env.VITE_USE_MOCK === 'true'
}

const mockLogin = (username, password) => {
  const user = MOCK_USERS.find(
    u => u.username === username && u.password === password
  )
  if (!user) throw new Error('Invalid credentials')
  const fakeToken = btoa(JSON.stringify({ sub: user.username, exp: Date.now() + 86400000 }))
  return { token: fakeToken, user: { id: user.id, username: user.username, email: user.email } }
}

const mockRegister = (username, email, password) => {
  const exists = MOCK_USERS.find(u => u.username === username)
  if (exists) throw new Error('Username already taken')
  const newUser = { id: Date.now(), username, email, password }
  MOCK_USERS.push(newUser)
  const fakeToken = btoa(JSON.stringify({ sub: username, exp: Date.now() + 86400000 }))
  return { token: fakeToken, user: { id: newUser.id, username, email } }
}

export const authService = {
  async login(username, password) {
    if (isMockMode()) {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 600))
      return mockLogin(username, password)
    }
    const { data } = await apiClient.post('/auth/login', { username, password })
    return data
  },

  async register(username, email, password) {
    if (isMockMode()) {
      await new Promise(r => setTimeout(r, 600))
      return mockRegister(username, email, password)
    }
    const { data } = await apiClient.post('/auth/register', { username, email, password })
    return data
  },

  logout() {
    localStorage.removeItem('ecosphere_token')
    localStorage.removeItem('ecosphere_user')
  },

  getCurrentUser() {
    const raw = localStorage.getItem('ecosphere_user')
    try { return raw ? JSON.parse(raw) : null } catch { return null }
  },

  isAuthenticated() {
    return !!localStorage.getItem('ecosphere_token')
  }
}
