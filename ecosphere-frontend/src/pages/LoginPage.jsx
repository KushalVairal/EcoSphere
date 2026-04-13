import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import Earth from '../three/Earth'
import Atmosphere from '../three/Atmosphere'
import Starfield from '../three/Starfield'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const navigate = useNavigate()

  const onSuccess = () => navigate('/dashboard')

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      {/* Animated globe background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ antialias: true, alpha: true }}
          style={{ background: '#050a14' }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <Starfield count={2000} />
            <Atmosphere />
            <Earth autoRotate />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(5,10,20,0.95) 35%, rgba(5,10,20,0.2) 100%)',
      }} />

      {/* Auth card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative', zIndex: 2,
          width: 420, padding: '48px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          minHeight: '100%',
        }}
      >
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #26c6da, #448aff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
          }}>🌍</div>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#e8f0fe', letterSpacing: '-0.02em' }}>EcoSphere</span>
        </div>

        {mode === 'login'
          ? <LoginForm onSwitch={() => setMode('register')} onSuccess={onSuccess} />
          : <RegisterForm onSwitch={() => setMode('login')} onSuccess={onSuccess} />
        }
      </motion.div>

      {/* Right side tagline */}
      <div style={{
        position: 'relative', zIndex: 2, flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 48, textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div style={{ fontSize: 36, fontWeight: 700, color: '#e8f0fe', lineHeight: 1.2, maxWidth: 400, marginBottom: 16 }}>
            Explore our planet's sustainability
          </div>
          <div style={{ fontSize: 15, color: '#8baad4', maxWidth: 360, lineHeight: 1.7 }}>
            Interactive 3D globe powered by real-world environmental data from the World Bank API.
          </div>
        </motion.div>
      </div>
    </div>
  )
}
