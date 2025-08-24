import { useFrame } from '@react-three/fiber'
import { useCallback, useRef, useState } from 'react'
import { useStore } from '@/stores/useStore'

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(Date.now())
  const setFrameRate = useStore(state => state.setFrameRate)
  
  useFrame(() => {
    frameCount.current++
    const now = Date.now()
    
    if (now - lastTime.current >= 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / (now - lastTime.current))
      setFps(currentFps)
      setFrameRate(currentFps)
      frameCount.current = 0
      lastTime.current = now
    }
  })
  
  return fps
}

// Render-on-demand hook
export function useRenderOnDemand() {
  const renderRequested = useStore(state => state.renderRequested)
  const requestRender = useStore(state => state.requestRender)
  const invalidate = useCallback(() => requestRender(), [requestRender])
  
  return { renderRequested, invalidate }
}

// Debounced interaction hook
export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay]) as T
}

// LOD (Level of Detail) hook
export function useLOD(distance: number) {
  const [lodLevel, setLodLevel] = useState<'high' | 'medium' | 'low'>('high')
  
  useFrame(({ camera }) => {
    const distanceFromCamera = camera.position.distanceTo(camera.position)
    
    if (distance > 20) {
      setLodLevel('low')
    } else if (distance > 10) {
      setLodLevel('medium')
    } else {
      setLodLevel('high')
    }
  })
  
  return lodLevel
}

// Memory usage tracking
export function useMemoryMonitor() {
  const [memoryUsage, setMemoryUsage] = useState<{
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  } | null>(null)
  
  useFrame(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      setMemoryUsage({
        usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
        totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
        jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      })
    }
  }, 60) // Update every 60 frames (1 second at 60fps)
  
  return memoryUsage
}