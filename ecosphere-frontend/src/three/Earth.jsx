import { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export default function Earth({ autoRotate = true, targetRotationY = 0 }) {
  const meshRef = useRef()
  const cloudRef = useRef()
  const autoRotRef = useRef(autoRotate)

  // Load textures from public NASA textures (or CDN fallback)
  // We use a procedural approach for offline-first dev
  const earthTexture = useLoader(
    TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg'
  )
  const specTexture = useLoader(
    TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png'
  )

  useEffect(() => { autoRotRef.current = autoRotate }, [autoRotate])

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return
    if (autoRotRef.current) {
      meshRef.current.rotation.y += delta * 0.04
    } else {
      // Smoothly lerp toward targetRotationY
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.03
      )
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.05
      cloudRef.current.rotation.x += delta * 0.01
    }
  })

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          specularMap={specTexture}
          specular={new THREE.Color(0x333333)}
          shininess={15}
        />
      </mesh>
    </group>
  )
}
