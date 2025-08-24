'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { SimplifiedScene } from './SimplifiedScene'

// Loading fallback
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4]">
      <div className="text-[#8b6f47] font-medium">Loading 3D Scene...</div>
    </div>
  )
}

// Main Canvas component
export function Canvas3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        camera={{ position: [8, 8, 8], fov: 75 }}
        className="outline-none"
      >
        <Suspense fallback={null}>
          <SimplifiedScene />
        </Suspense>
      </Canvas>
      
      <Suspense fallback={<CanvasLoader />}>
        <div />
      </Suspense>
    </div>
  )
}