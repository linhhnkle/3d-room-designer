import { useRef, useMemo } from 'react'
import { DirectionalLight, AmbientLight } from 'three'
import { useHelper } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'

interface LightsProps {
  timeOfDay?: 'day' | 'sunset' | 'night'
  showHelpers?: boolean
}

export function Lights({ timeOfDay = 'day', showHelpers = false }: LightsProps) {
  const sunLightRef = useRef<DirectionalLight>(null)
  const ambientLightRef = useRef<AmbientLight>(null)
  
  // Show light helpers in development
  useHelper(showHelpers && sunLightRef, DirectionalLightHelper, 1)
  
  // Memoized light configurations for different times of day
  const lightConfig = useMemo(() => {
    switch (timeOfDay) {
      case 'sunset':
        return {
          ambient: { color: 0xfff0d4, intensity: 0.3 },
          sun: { 
            color: 0xffb366, 
            intensity: 0.8,
            position: [5, 8, 10] as [number, number, number]
          }
        }
      case 'night':
        return {
          ambient: { color: 0x404080, intensity: 0.4 },
          sun: { 
            color: 0x8080ff, 
            intensity: 0.3,
            position: [-5, 6, 8] as [number, number, number]
          }
        }
      default: // day
        return {
          ambient: { color: 0xfff4e6, intensity: 0.25 },
          sun: { 
            color: 0xffd4a0, 
            intensity: 0.6,
            position: [10, 15, 8] as [number, number, number]
          }
        }
    }
  }, [timeOfDay])
  
  return (
    <group name="lights">
      {/* Ambient Light */}
      <ambientLight
        ref={ambientLightRef}
        color={lightConfig.ambient.color}
        intensity={lightConfig.ambient.intensity}
      />
      
      {/* Directional Light (Sun) */}
      <directionalLight
        ref={sunLightRef}
        color={lightConfig.sun.color}
        intensity={lightConfig.sun.intensity}
        position={lightConfig.sun.position}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-radius={10}
        shadow-blurSamples={8}
      />
    </group>
  )
}

// Performance-optimized shadow settings
export const SHADOW_CONFIG = {
  enabled: true,
  type: 'PCFSoftShadowMap' as const,
  autoUpdate: false, // Manual shadow updates for better performance
}