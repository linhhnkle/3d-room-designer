import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { OrthographicCamera, Vector3 } from 'three'
import { useStore } from '@/stores/useStore'

interface CameraProps {
  position?: [number, number, number]
  target?: [number, number, number]
}

export function Camera({ 
  position = [12, 8, 12], 
  target = [0, 2, 0] 
}: CameraProps) {
  const cameraRef = useRef<OrthographicCamera>(null)
  const { size, set } = useThree()
  
  const cameraPosition = useStore(state => state.cameraPosition)
  const cameraRotation = useStore(state => state.cameraRotation)
  const requestRender = useStore(state => state.requestRender)
  
  // Update orthographic camera bounds on resize
  useEffect(() => {
    if (cameraRef.current) {
      const aspect = size.width / size.height
      const frustumSize = 16
      
      cameraRef.current.left = (-frustumSize * aspect) / 2
      cameraRef.current.right = (frustumSize * aspect) / 2
      cameraRef.current.top = frustumSize / 2
      cameraRef.current.bottom = -frustumSize / 2
      cameraRef.current.updateProjectionMatrix()
      
      requestRender()
    }
  }, [size])
  
  // Set camera position and target - run once on mount
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...position)
      cameraRef.current.lookAt(...target)
      cameraRef.current.updateProjectionMatrix()
      requestRender()
    }
  }, []) // Empty dependencies - only run once
  
  // Smooth camera rotation
  useFrame(() => {
    if (cameraRef.current && cameraRotation !== 0) {
      const radius = 14
      const x = Math.cos(cameraRotation) * radius
      const z = Math.sin(cameraRotation) * radius
      
      cameraRef.current.position.set(x, 8, z)
      cameraRef.current.lookAt(0, 2, 0)
      cameraRef.current.updateProjectionMatrix()
      
      requestRender()
    }
  })
  
  return (
    <orthographicCamera
      ref={cameraRef}
      makeDefault
      position={position}
      near={0.1}
      far={100}
      zoom={1}
    />
  )
}

// Camera control functions
export function useCameraControls() {
  const cameraRotation = useStore(state => state.cameraRotation)
  
  const rotateLeft = () => {
    useStore.setState(state => ({
      cameraRotation: state.cameraRotation + Math.PI / 4
    }))
  }
  
  const rotateRight = () => {
    useStore.setState(state => ({
      cameraRotation: state.cameraRotation - Math.PI / 4
    }))
  }
  
  const resetCamera = () => {
    useStore.setState({
      cameraRotation: 0,
      cameraPosition: new Vector3(12, 8, 12)
    })
  }
  
  return {
    rotateLeft,
    rotateRight,
    resetCamera,
    currentRotation: cameraRotation
  }
}