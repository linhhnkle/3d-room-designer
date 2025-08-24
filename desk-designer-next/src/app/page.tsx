'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Canvas3D } from '@/components/Canvas3D'
import { Controls } from '@/components/UI/Controls'
import { Toolbar } from '@/components/UI/Toolbar'
import { FurnitureMenu } from '@/components/UI/FurnitureMenu'
import { PerformanceMonitor } from '@/components/UI/PerformanceMonitor'

// Dynamically import components that use browser APIs
const DynamicCanvas3D = dynamic(() => import('@/components/Canvas3D').then(mod => ({ default: mod.Canvas3D })), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4]">
      <div className="text-[#8b6f47] font-medium">Loading 3D Room Designer...</div>
    </div>
  )
})

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4]">
      {/* Instructions */}
      <div className="absolute top-5 left-5 z-10">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm">
          <p className="text-sm text-[#8b6f47]">
            Click to select • Drag to move • Use toolbar to edit objects
          </p>
        </div>
      </div>
      
      {/* Performance Stats (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-5 right-5 z-10">
          <PerformanceMonitor />
        </div>
      )}
      
      {/* 3D Canvas */}
      <Suspense fallback={<LoadingScreen />}>
        <DynamicCanvas3D />
      </Suspense>
      
      {/* UI Overlays */}
      <Controls />
      <Toolbar />
      <FurnitureMenu />
      
      {/* Color Panels - Will be implemented next */}
      {/* <ColorPanel />
      <TexturePanel />
      <ObjectColorPanel /> */}
    </main>
  )
}

// Loading screen component
function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4]">
      <div className="text-center">
        <div className="text-2xl mb-4">🏠</div>
        <div className="text-[#8b6f47] font-medium mb-2">Loading Room Designer</div>
        <div className="w-32 h-1 bg-[#e8d5c4] rounded-full overflow-hidden">
          <div className="h-full bg-[#8b6f47] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

