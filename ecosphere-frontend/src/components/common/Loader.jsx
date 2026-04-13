import { motion } from 'framer-motion'

export default function Loader({ message = 'Loading EcoSphere…' }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#050a14',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 100,
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        style={{ fontSize: 48, marginBottom: 20 }}
      >
        🌍
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ color: '#8baad4', fontSize: 14 }}
      >
        {message}
      </motion.div>
    </div>
  )
}
