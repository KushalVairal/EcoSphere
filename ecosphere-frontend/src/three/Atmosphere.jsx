import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const atmosphereVert = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const atmosphereFrag = `
varying vec3 vNormal;
uniform vec3 glowColor;
void main() {
  float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
  gl_FragColor = vec4(glowColor, 1.0) * intensity;
}
`

export default function Atmosphere() {
  const meshRef = useRef()

  return (
    <mesh ref={meshRef} scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVert}
        fragmentShader={atmosphereFrag}
        uniforms={{
          glowColor: { value: new THREE.Color(0x26c6da) }
        }}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
      />
    </mesh>
  )
}
