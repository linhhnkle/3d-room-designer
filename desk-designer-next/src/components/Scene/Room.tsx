import { useMemo, useRef } from 'react'
import { Mesh, PlaneGeometry, MeshLambertMaterial, DoubleSide } from 'three'
import { useStore } from '@/stores/useStore'

// Geometries will be created inside the component

// Shared materials to reduce memory usage
const createFloorMaterial = () => new MeshLambertMaterial({ 
  color: 0xd4b896,
  side: DoubleSide 
})

const createWallMaterial = () => new MeshLambertMaterial({ 
  color: 0xe8dcc6,
  side: DoubleSide 
})

export function Room() {
  const floorRef = useRef<Mesh>(null)
  const backWallRef = useRef<Mesh>(null)
  const leftWallRef = useRef<Mesh>(null)
  
  const surfaces = useStore(state => state.surfaces)
  const requestRender = useStore(state => state.requestRender)
  
  // Memoized geometries and materials
  const floorGeometry = useMemo(() => new PlaneGeometry(20, 20), [])
  const wallGeometry = useMemo(() => new PlaneGeometry(20, 8), [])
  const floorMaterial = useMemo(() => createFloorMaterial(), [])
  const wallMaterial = useMemo(() => createWallMaterial(), [])
  
  // Register surfaces when components mount
  const registerSurface = (mesh: Mesh | null) => {
    if (mesh && !surfaces.includes(mesh)) {
      surfaces.push(mesh)
      requestRender()
    }
  }
  
  return (
    <group name="room">
      {/* Floor */}
      <mesh 
        ref={(mesh) => {
          floorRef.current = mesh
          registerSurface(mesh)
        }}
        geometry={floorGeometry}
        material={floorMaterial}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        userData={{ isFloor: true, isSurface: true }}
        name="floor"
      />
      
      {/* Back Wall */}
      <mesh 
        ref={(mesh) => {
          backWallRef.current = mesh
          registerSurface(mesh)
        }}
        geometry={wallGeometry}
        material={wallMaterial}
        position={[0, 4, -10]}
        receiveShadow
        userData={{ isWall: true }}
        name="backWall"
      />
      
      {/* Left Wall */}
      <mesh 
        ref={(mesh) => {
          leftWallRef.current = mesh
          registerSurface(mesh)
        }}
        geometry={wallGeometry}
        material={wallMaterial}
        position={[-10, 4, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        userData={{ isWall: true }}
        name="leftWall"
      />
    </group>
  )
}

// Separate component for room color changes to prevent unnecessary re-renders
export function useRoomColors() {
  const updateFloorColor = (color: string) => {
    // Implementation will be added when color system is integrated
  }
  
  const updateWallColor = (color: string) => {
    // Implementation will be added when color system is integrated
  }
  
  return { updateFloorColor, updateWallColor }
}