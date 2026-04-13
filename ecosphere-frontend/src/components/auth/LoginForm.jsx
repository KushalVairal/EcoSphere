import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

export default function LoginForm({ onSwitch, onSuccess }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      onSuccess()
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
    padding: '12px 14px', color: '#e8f0fe', fontSize: 14,
    transition: 'border-color 0.2s',
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: '#e8f0fe', marginBottom: 6 }}>Welcome back</h2>
      <p style={{ fontSize: 13, color: '#8baad4', marginBottom: 24 }}>
        Sign in to your EcoSphere account
      </p>
      <p style={{ fontSize: 12, color: '#4a6a9a', marginBottom: 20, background: 'rgba(38,198,218,0.08)', border: '1px solid rgba(38,198,218,0.2)', borderRadius: 8, padding: '8px 12px' }}>
        Demo credentials: <strong style={{ color: '#26c6da' }}>demo</strong> / <strong style={{ color: '#26c6da' }}>demo123</strong>
      </p>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: '#8baad4', display: 'block', marginBottom: 6 }}>Username</label>
          <input name="username" value={form.username} onChange={handle} placeholder="Enter username"
            required autoComplete="username" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: '#8baad4', display: 'block', marginBottom: 6 }}>Password</label>
          <input name="password" type="password" value={form.password} onChange={handle} placeholder="Enter password"
            required autoComplete="current-password" style={inputStyle} />
        </div>

        {error && (
          <div style={{ fontSize: 13, color: '#ff5252', background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.2)', borderRadius: 8, padding: '8px 12px' }}>
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: 4, padding: '13px', fontSize: 15, fontWeight: 600,
            borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
            background: loading ? 'rgba(38,198,218,0.3)' : 'linear-gradient(135deg, #26c6da, #448aff)',
            color: '#fff', border: 'none', opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </motion.button>
      </form>

      <p style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: '#8baad4' }}>
        No account?{' '}
        <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#26c6da', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
          Create one
        </button>
      </p>
    </motion.div>
  )
}
