import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Earth from './Earth'
import Atmosphere from './Atmosphere'
import Starfield from './Starfield'
import CountryMarkers from './CountryMarkers'

export default function Scene({ countries, selectedIso, onCountrySelect, autoRotate }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.4} color="#fff8f0" />
      <pointLight position={[-10, -5, -5]} intensity={0.2} color="#1a3a6e" />

      <Suspense fallback={null}>
        <Starfield count={2500} />
        <Atmosphere />
        <Earth autoRotate={autoRotate} />
        <CountryMarkers
          countries={countries}
          selectedIso={selectedIso}
          onSelect={onCountrySelect}
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={1.6}
        maxDistance={5}
        rotateSpeed={0.4}
        zoomSpeed={0.6}
        autoRotate={false}
      />
    </Canvas>
  )
}
