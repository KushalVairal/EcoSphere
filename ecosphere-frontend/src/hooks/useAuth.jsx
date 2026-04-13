import { useState, useEffect, createContext, useContext } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore session from localStorage
    const savedUser = authService.getCurrentUser()
    if (savedUser && authService.isAuthenticated()) {
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const { token, user: userData } = await authService.login(username, password)
    localStorage.setItem('ecosphere_token', token)
    localStorage.setItem('ecosphere_user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const register = async (username, email, password) => {
    const { token, user: userData } = await authService.register(username, email, password)
    localStorage.setItem('ecosphere_token', token)
    localStorage.setItem('ecosphere_user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
