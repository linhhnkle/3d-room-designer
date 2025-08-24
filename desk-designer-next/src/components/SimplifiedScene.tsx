'use client'

import { Box, Plane, OrbitControls, Environment, Text } from '@react-three/drei'
import { useRef } from 'react'

export function SimplifiedScene() {
  return (
    <>
      {/* Camera Controls */}
      <OrbitControls makeDefault enablePan={true} enableZoom={true} enableRotate={true} />
      
      {/* Lighting */}
      <Environment preset="apartment" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      {/* Floor */}
      <Plane 
        args={[20, 20]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#d4b896" />
      </Plane>
      
      {/* Back Wall */}
      <Plane 
        args={[20, 8]} 
        position={[0, 4, -10]}
        receiveShadow
      >
        <meshStandardMaterial color="#e8dcc6" />
      </Plane>
      
      {/* Left Wall */}
      <Plane 
        args={[20, 8]} 
        rotation={[0, Math.PI / 2, 0]}
        position={[-10, 4, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#e8dcc6" />
      </Plane>
      
      {/* Test objects to verify scene is working */}
      <Box position={[2, 1, 2]} castShadow>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      <Box position={[-2, 1, -2]} castShadow>
        <meshStandardMaterial color="#4a7c59" />
      </Box>
      
      {/* Text to confirm scene is rendering */}
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="#8b6f47"
        anchorX="center"
        anchorY="middle"
      >
        3D Room Designer
      </Text>
    </>
  )
}