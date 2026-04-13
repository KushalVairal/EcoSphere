import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import Loader from './components/common/Loader'

// Route guard: redirect to /login if not authenticated
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <Loader />
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Redirect to dashboard if already logged in
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <Loader />
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Routes>
            <Route path="/login" element={
              <PublicRoute><LoginPage /></PublicRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute><DashboardPage /></PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
