import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Scene from '../three/Scene'
import Sidebar from '../components/dashboard/Sidebar'
import MetricsPanel from '../components/dashboard/MetricsPanel'
import Loader from '../components/common/Loader'
import { useEarthData } from '../hooks/useEarthData'
import { useAuth } from '../hooks/useAuth'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const {
    countries, selectedCountry, loading, metricsLoading,
    watchlist, selectCountry, toggleWatchlist,
  } = useEarthData()

  const [autoRotate, setAutoRotate] = useState(true)

  const handleCountrySelect = (isoCode) => {
    setAutoRotate(false)
    selectCountry(isoCode)
  }

  const handleClose = () => {
    selectCountry(null)
    setAutoRotate(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return <Loader message="Loading countries…" />

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#050a14' }}>

      {/* 3D Globe - full screen canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene
          countries={countries}
          selectedIso={selectedCountry?.isoCode}
          onCountrySelect={handleCountrySelect}
          autoRotate={autoRotate}
        />
      </div>

      {/* Left sidebar */}
      <Sidebar
        countries={countries}
        selectedIso={selectedCountry?.isoCode}
        onSelect={handleCountrySelect}
        watchlist={watchlist}
        onLogout={handleLogout}
      />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, display: 'flex', alignItems: 'center', gap: 12,
        }}
      >
        <div style={{
          background: 'rgba(5,10,20,0.85)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '8px 18px', backdropFilter: 'blur(12px)',
          fontSize: 13, color: '#8baad4',
        }}>
          {selectedCountry
            ? `Viewing: ${selectedCountry.name}`
            : autoRotate ? '🌍 Exploring — click any marker to select' : '🖱 Drag to rotate · Scroll to zoom'}
        </div>

        <button
          onClick={() => { setAutoRotate(v => !v) }}
          style={{
            background: 'rgba(5,10,20,0.85)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: '8px 14px', backdropFilter: 'blur(12px)',
            fontSize: 12, color: autoRotate ? '#26c6da' : '#8baad4', cursor: 'pointer',
          }}
        >
          {autoRotate ? '⏸ Pause' : '▶ Auto-rotate'}
        </button>
      </motion.div>

      {/* Right metrics panel */}
      {(selectedCountry || metricsLoading) && (
        <MetricsPanel
          country={selectedCountry}
          loading={metricsLoading}
          onClose={handleClose}
          onWatchlist={toggleWatchlist}
          isWatched={watchlist.includes(selectedCountry?.isoCode)}
        />
      )}

      {/* Bottom data source badge */}
      <div style={{
        position: 'absolute', bottom: 16, right: 20, zIndex: 20,
        fontSize: 11, color: '#4a6a9a',
      }}>
        Data: World Bank API · Mock mode active in dev
      </div>
    </div>
  )
}
