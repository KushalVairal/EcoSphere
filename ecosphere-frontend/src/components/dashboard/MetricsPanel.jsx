import { motion, AnimatePresence } from 'framer-motion'
import { co2Label, renewableToColor } from '../../utils/colorScale'
import { formatNumber } from '../../utils/geometryUtils'

function StatBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 6, overflow: 'hidden', marginTop: 6 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ height: '100%', borderRadius: 4, background: color }}
      />
    </div>
  )
}

function MetricCard({ icon, label, value, unit, bar, barMax, barColor, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '12px 14px',
        marginBottom: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontSize: 11, color: '#8baad4', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: barColor || '#e8f0fe' }}>{value}</span>
        <span style={{ fontSize: 12, color: '#4a6a9a' }}>{unit}</span>
      </div>
      {sub && <div style={{ fontSize: 11, color: sub.color, marginTop: 2 }}>{sub.text}</div>}
      {bar !== undefined && <StatBar value={bar} max={barMax} color={barColor || '#448aff'} />}
    </motion.div>
  )
}

export default function MetricsPanel({ country, loading, onClose, onWatchlist, isWatched }) {
  if (!country && !loading) return null

  const co2Info = country ? co2Label(country.co2Emissions) : null
  const renewColor = country ? renewableToColor(country.renewablePercentage) : '#fff'

  return (
    <AnimatePresence>
      <motion.div
        key={country?.isoCode || 'loading'}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 80,
          right: 20,
          width: 280,
          background: 'rgba(5,10,20,0.88)',
          border: '1px solid rgba(38,198,218,0.2)',
          borderRadius: 16,
          padding: '16px',
          backdropFilter: 'blur(16px)',
          zIndex: 20,
          maxHeight: 'calc(100vh - 110px)',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            {loading ? (
              <div style={{ width: 120, height: 20, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
            ) : (
              <>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#e8f0fe' }}>{country.name}</div>
                <div style={{ fontSize: 12, color: '#4a6a9a', marginTop: 2 }}>{country.isoCode}</div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {country && (
              <button
                onClick={() => onWatchlist(country.isoCode)}
                title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
                style={{
                  background: isWatched ? 'rgba(38,198,218,0.15)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${isWatched ? 'rgba(38,198,218,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  padding: '4px 8px',
                  color: isWatched ? '#26c6da' : '#8baad4',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {isWatched ? '★' : '☆'}
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '4px 8px',
                color: '#8baad4',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: '#4a6a9a', fontSize: 13 }}>
            <div style={{ marginBottom: 8 }}>⏳ Loading metrics…</div>
          </div>
        ) : (
          <>
            <MetricCard
              icon="🏭"
              label="CO₂ Emissions"
              value={country.co2Emissions.toFixed(2)}
              unit="tonnes / capita"
              bar={country.co2Emissions}
              barMax={20}
              barColor={co2Info.color}
              sub={co2Info}
            />
            <MetricCard
              icon="⚡"
              label="Renewable Energy"
              value={country.renewablePercentage}
              unit="% of total"
              bar={country.renewablePercentage}
              barMax={100}
              barColor={renewColor}
            />
            <MetricCard
              icon="🌲"
              label="Forest Cover"
              value={country.forestArea.toFixed(1)}
              unit="% of land"
              bar={country.forestArea}
              barMax={100}
              barColor="#00e676"
            />
            <MetricCard
              icon="👥"
              label="Population"
              value={formatNumber(country.population)}
              unit="people"
            />
            <MetricCard
              icon="💰"
              label="GDP per Capita"
              value={`$${country.gdpPerCapita.toLocaleString()}`}
              unit="USD"
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
