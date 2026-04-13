import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { latLonToVec3 } from '../utils/geometryUtils'
import { co2ToColor } from '../utils/colorScale'

function CountryMarker({ country, isSelected, onClick }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)
  const pos = useMemo(() => {
    const v = latLonToVec3(country.lat, country.lon, 1.02)
    return [v.x, v.y, v.z]
  }, [country.lat, country.lon])

  const color = useMemo(() => co2ToColor(country.co2Emissions), [country.co2Emissions])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    // Pulse scale when selected
    if (isSelected) {
      meshRef.current.scale.setScalar(1.3 + Math.sin(t * 4) * 0.3)
    } else if (hovered) {
      meshRef.current.scale.setScalar(1.2)
    } else {
      meshRef.current.scale.setScalar(1.0)
    }
    // Glow pulse
    if (glowRef.current) {
      glowRef.current.material.opacity = isSelected
        ? 0.4 + Math.sin(t * 3) * 0.2
        : 0.15
    }
  })

  return (
    <group position={pos}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      {/* Main pin */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(country.isoCode) }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 1.5 : hovered ? 1.0 : 0.6}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      {/* Hover tooltip */}
      {hovered && !isSelected && (
        <Html distanceFactor={3} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(5,10,20,0.92)',
            border: '1px solid rgba(38,198,218,0.3)',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#e8f0fe',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
          }}>
            {country.name}
          </div>
        </Html>
      )}
    </group>
  )
}

export default function CountryMarkers({ countries, selectedIso, onSelect }) {
  return (
    <group>
      {countries.map(country => (
        <CountryMarker
          key={country.isoCode}
          country={country}
          isSelected={selectedIso === country.isoCode}
          onClick={onSelect}
        />
      ))}
    </group>
  )
}
