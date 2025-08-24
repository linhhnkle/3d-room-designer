import { Suspense, useMemo, useCallback, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Object3D, Vector3, Box3, Mesh, MeshLambertMaterial } from 'three'
import { useStore } from '@/stores/useStore'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

// Model path mapping
const MODEL_PATHS: Record<string, string> = {
  desk: '/Furniture/desk1.glb',
  chair: '/Furniture/chair.glb',
  monitor: '/Furniture/monitor.glb',
  plant: '/Furniture/plant1.glb'
}

// Fallback geometries for failed models
const FALLBACK_GEOMETRIES = {
  desk: { type: 'box', args: [4, 1.2, 2], color: 0x8B4513 },
  chair: { type: 'box', args: [1.2, 2, 1.2], color: 0x654321 },
  monitor: { type: 'box', args: [2, 1.5, 0.2], color: 0x2a2a2a },
  plant: { type: 'sphere', args: [0.8, 8, 6], color: 0x4a7c59 }
}

// Scale configurations
const OBJECT_SCALES: Record<string, number> = {
  desk: 4,
  chair: 4,
  monitor: 3,
  plant: 3,
  sofa: 5,
  lamp: 2,
  laptop: 1.5
}

interface GLTFModelProps {
  type: string
  position: Vector3
  onLoad?: (object: Object3D) => void
}

// Individual GLTF model component with error boundary
function GLTFModel({ type, position, onLoad }: GLTFModelProps) {
  const modelRef = useRef<Object3D>(null)
  const modelPath = MODEL_PATHS[type]
  
  try {
    const { scene } = useGLTF(modelPath) as GLTF
    
    // Clone the scene to allow multiple instances
    const clonedScene = useMemo(() => {
      const clone = scene.clone()
      
      // Set scale
      const scale = OBJECT_SCALES[type] || 1
      clone.scale.setScalar(scale)
      
      // Set position
      clone.position.copy(position)
      
      // Configure for shadows
      clone.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true
          child.receiveShadow = true
          
          // Clone materials to avoid sharing
          if (child.material) {
            child.material = child.material.clone()
          }
        }
      })
      
      // Set metadata
      clone.userData = {
        type,
        isModel: true,
        isSurface: ['desk', 'chair', 'sofa'].includes(type)
      }
      
      return clone
    }, [scene, type, position])
    
    // Notify parent when loaded
    useMemo(() => {
      if (onLoad && clonedScene) {
        onLoad(clonedScene)
      }
    }, [clonedScene, onLoad])
    
    return <primitive ref={modelRef} object={clonedScene} />
    
  } catch (error) {
    console.warn(`Failed to load model ${type}, using fallback`)
    return <FallbackModel type={type} position={position} onLoad={onLoad} />
  }
}

// Fallback component for failed model loads
function FallbackModel({ type, position, onLoad }: GLTFModelProps) {
  const meshRef = useRef<Mesh>(null)
  const fallback = FALLBACK_GEOMETRIES[type] || FALLBACK_GEOMETRIES.desk
  
  const mesh = useMemo(() => {
    let geometry
    
    switch (fallback.type) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(...fallback.args)
        break
      default:
        geometry = new THREE.BoxGeometry(...fallback.args)
    }
    
    const material = new MeshLambertMaterial({ color: fallback.color })
    const mesh = new Mesh(geometry, material)
    
    mesh.position.copy(position)
    mesh.castShadow = true
    mesh.receiveShadow = true
    
    mesh.userData = {
      type,
      isModel: false,
      isSurface: ['desk', 'chair', 'sofa'].includes(type)
    }
    
    return mesh
  }, [type, position, fallback])
  
  useMemo(() => {
    if (onLoad && mesh) {
      onLoad(mesh)
    }
  }, [mesh, onLoad])
  
  return <primitive ref={meshRef} object={mesh} />
}

// Loading placeholder component
function LoadingPlaceholder({ position }: { position: Vector3 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0x888888} transparent opacity={0.3} />
    </mesh>
  )
}

// Main object loader with suspense and error handling
interface ObjectLoaderProps {
  type: string
  position?: Vector3
  id?: string
}

export function ObjectLoader({ type, position = new Vector3(), id }: ObjectLoaderProps) {
  const addObject = useStore(state => state.addObject)
  const selectObject = useStore(state => state.selectObject)
  const surfaces = useStore(state => state.surfaces)
  
  const handleObjectLoad = useCallback((object: Object3D) => {
    const objectData = {
      id: id || `${type}-${Date.now()}`,
      object,
      type,
      position: position.clone(),
      scale: new Vector3(1, 1, 1),
      rotation: 0
    }
    
    // Add to store
    addObject(objectData)
    
    // Add to surfaces if applicable
    if (object.userData.isSurface) {
      surfaces.push(object)
    }
    
    // Auto-select newly added objects
    selectObject(objectData)
  }, [type, position, id, addObject, selectObject, surfaces])
  
  return (
    <Suspense fallback={<LoadingPlaceholder position={position} />}>
      <GLTFModel 
        type={type} 
        position={position} 
        onLoad={handleObjectLoad}
      />
    </Suspense>
  )
}

// Preload all models for better performance
export function preloadModels() {
  Object.values(MODEL_PATHS).forEach(path => {
    useGLTF.preload(path)
  })
}

// Cleanup function to dispose of unused models
useGLTF.clear = () => {
  Object.values(MODEL_PATHS).forEach(path => {
    useGLTF.clear(path)
  })
}