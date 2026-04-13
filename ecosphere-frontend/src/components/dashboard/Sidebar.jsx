import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { co2Label } from '../../utils/colorScale'
import { useAuth } from '../../hooks/useAuth'

function CountryRow({ country, isSelected, isWatched, onClick }) {
  const { text, color } = co2Label(country.co2Emissions)
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
      onClick={() => onClick(country.isoCode)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '9px 12px',
        borderRadius: 8,
        cursor: 'pointer',
        background: isSelected ? 'rgba(38,198,218,0.1)' : 'transparent',
        border: isSelected ? '1px solid rgba(38,198,218,0.25)' : '1px solid transparent',
        marginBottom: 2,
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#e8f0fe' }}>{country.name}</div>
        <div style={{ fontSize: 11, color: '#4a6a9a' }}>{country.isoCode}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 11, color, fontWeight: 500 }}>{text}</div>
        <div style={{ fontSize: 10, color: '#4a6a9a' }}>{country.co2Emissions.toFixed(1)} t/cap</div>
      </div>
    </motion.div>
  )
}

export default function Sidebar({ countries, selectedIso, onSelect, watchlist, onLogout }) {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('all') // 'all' | 'watchlist'
  const { user } = useAuth()

  const filtered = useMemo(() => {
    const list = tab === 'watchlist'
      ? countries.filter(c => watchlist.includes(c.isoCode))
      : countries
    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(c =>
      c.name.toLowerCase().includes(q) || c.isoCode.toLowerCase().includes(q)
    )
  }, [countries, search, tab, watchlist])

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 260,
      height: '100%',
      background: 'rgba(5,10,20,0.88)',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 20,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #26c6da, #448aff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>🌍</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e8f0fe', letterSpacing: '-0.02em' }}>EcoSphere</div>
            <div style={{ fontSize: 10, color: '#4a6a9a' }}>Sustainability Dashboard</div>
          </div>
        </div>
        {user && (
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: '#8baad4' }}>👤 {user.username}</span>
            <button
              onClick={onLogout}
              style={{
                fontSize: 11, color: '#4a6a9a', background: 'none',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6, padding: '3px 8px', cursor: 'pointer',
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '10px 12px 0', gap: 6 }}>
        {['all', 'watchlist'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '6px 0', fontSize: 12, borderRadius: 7, cursor: 'pointer',
              background: tab === t ? 'rgba(38,198,218,0.15)' : 'rgba(255,255,255,0.04)',
              border: tab === t ? '1px solid rgba(38,198,218,0.3)' : '1px solid rgba(255,255,255,0.07)',
              color: tab === t ? '#26c6da' : '#8baad4',
              fontWeight: tab === t ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >
            {t === 'all' ? `All (${countries.length})` : `★ Watchlist (${watchlist.length})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: '10px 12px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            fontSize: 13, color: '#4a6a9a', pointerEvents: 'none'
          }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search countries…"
            style={{
              width: '100%', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
              padding: '8px 10px 8px 32px', color: '#e8f0fe', fontSize: 13,
            }}
          />
        </div>
      </div>

      {/* Country list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 16px' }}>
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#4a6a9a', fontSize: 12, marginTop: 32 }}>
              {tab === 'watchlist' ? 'No watchlist items yet.\nClick ☆ on a country to add it.' : 'No results found.'}
            </div>
          ) : (
            filtered.map(c => (
              <CountryRow
                key={c.isoCode}
                country={c}
                isSelected={selectedIso === c.isoCode}
                isWatched={watchlist.includes(c.isoCode)}
                onClick={onSelect}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontSize: 11, color: '#4a6a9a'
      }}>
        <div style={{ marginBottom: 6, fontWeight: 500, color: '#8baad4' }}>CO₂ Emissions legend</div>
        {[
          { label: 'Very Low  < 3t', color: '#00e676' },
          { label: 'Low  3–7t', color: '#69f0ae' },
          { label: 'Medium  7–11t', color: '#ffab40' },
          { label: 'High  11–15t', color: '#ff6d00' },
          { label: 'Very High  > 15t', color: '#ff1744' },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
