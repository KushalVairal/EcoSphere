import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

export default function RegisterForm({ onSwitch, onSuccess }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register(form.username, form.email, form.password)
      onSuccess()
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
    padding: '12px 14px', color: '#e8f0fe', fontSize: 14,
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%' }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: '#e8f0fe', marginBottom: 6 }}>Create account</h2>
      <p style={{ fontSize: 13, color: '#8baad4', marginBottom: 24 }}>
        Join EcoSphere and track global sustainability
      </p>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { name: 'username', label: 'Username', type: 'text', placeholder: 'Choose a username' },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
          { name: 'password', label: 'Password', type: 'password', placeholder: 'Min. 6 characters' },
          { name: 'confirm', label: 'Confirm password', type: 'password', placeholder: 'Repeat password' },
        ].map(field => (
          <div key={field.name}>
            <label style={{ fontSize: 12, color: '#8baad4', display: 'block', marginBottom: 6 }}>{field.label}</label>
            <input
              name={field.name} type={field.type} value={form[field.name]}
              onChange={handle} placeholder={field.placeholder}
              required style={inputStyle}
            />
          </div>
        ))}

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
          {loading ? 'Creating account…' : 'Create account'}
        </motion.button>
      </form>

      <p style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: '#8baad4' }}>
        Already have an account?{' '}
        <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#26c6da', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
          Sign in
        </button>
      </p>
    </motion.div>
  )
}
