import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Starfield({ count = 3000 }) {
  const meshRef = useRef()

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Random spherical distribution
      const r = 80 + Math.random() * 120
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sz[i] = Math.random() * 1.5 + 0.3
    }
    return [pos, sz]
  }, [count])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Very slow drift rotation
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.005
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.003) * 0.02
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        sizeAttenuation
        color="#b0c8ff"
        transparent
        opacity={0.8}
        fog={false}
      />
    </points>
  )
}
