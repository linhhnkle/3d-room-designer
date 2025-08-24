'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/stores/useStore'

interface PerformanceData {
  fps: number
  objectCount: number
  memoryUsage: {
    used: number
    total: number
    limit: number
  } | null
  renderTime: number
  lastFrameTime: number
}

export function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fps: 0,
    objectCount: 0,
    memoryUsage: null,
    renderTime: 0,
    lastFrameTime: 0
  })
  
  const objects = useStore(state => state.objects)
  const frameRate = useStore(state => state.frameRate)
  
  // Monitor performance metrics
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationFrame: number
    
    const updateMetrics = () => {
      const now = performance.now()
      frameCount++
      
      // Update every second
      if (now - lastTime >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (now - lastTime))
        
        // Get memory usage if available
        let memory = null
        if ('memory' in performance) {
          const memInfo = (performance as any).memory
          memory = {
            used: Math.round(memInfo.usedJSHeapSize / 1048576), // MB
            total: Math.round(memInfo.totalJSHeapSize / 1048576), // MB
            limit: Math.round(memInfo.jsHeapSizeLimit / 1048576) // MB
          }
        }
        
        setPerformanceData(prev => ({
          ...prev,
          fps: currentFPS,
          objectCount: objects.length,
          memoryUsage: memory,
          lastFrameTime: now - lastTime
        }))
        
        frameCount = 0
        lastTime = now
      }
      
      animationFrame = requestAnimationFrame(updateMetrics)
    }
    
    updateMetrics()
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [objects.length])
  
  // Performance warnings
  const getPerformanceStatus = () => {
    if (performanceData.fps < 30) return 'poor'
    if (performanceData.fps < 45) return 'fair'
    if (performanceData.fps < 55) return 'good'
    return 'excellent'
  }
  
  const status = getPerformanceStatus()
  const statusColors = {
    poor: 'text-red-400',
    fair: 'text-yellow-400',
    good: 'text-blue-400',
    excellent: 'text-green-400'
  }
  
  if (process.env.NODE_ENV !== 'development') {
    return null
  }
  
  return (
    <div className="bg-black/90 text-white text-xs p-3 rounded-lg font-mono space-y-1 min-w-32">
      <div className="flex justify-between">
        <span>FPS:</span>
        <span className={statusColors[status]}>
          {performanceData.fps}
        </span>
      </div>
      
      <div className="flex justify-between">
        <span>Objects:</span>
        <span>{performanceData.objectCount}</span>
      </div>
      
      {performanceData.memoryUsage && (
        <>
          <div className="flex justify-between">
            <span>Memory:</span>
            <span>{performanceData.memoryUsage.used}MB</span>
          </div>
          
          <div className="flex justify-between">
            <span>Limit:</span>
            <span>{performanceData.memoryUsage.limit}MB</span>
          </div>
        </>
      )}
      
      <div className="flex justify-between">
        <span>Frame:</span>
        <span>{performanceData.lastFrameTime.toFixed(1)}ms</span>
      </div>
      
      {/* Performance bar */}
      <div className="mt-2">
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-200 ${
              status === 'excellent' ? 'bg-green-400' :
              status === 'good' ? 'bg-blue-400' :
              status === 'fair' ? 'bg-yellow-400' : 'bg-red-400'
            }`}
            style={{ width: `${Math.min(performanceData.fps / 60 * 100, 100)}%` }}
          />
        </div>
        <div className="text-center mt-1 text-gray-400 text-[10px]">
          {status.toUpperCase()}
        </div>
      </div>
      
      {/* Optimization suggestions */}
      {status === 'poor' && (
        <div className="mt-2 p-1 bg-red-900/50 rounded text-[10px]">
          ⚠️ Low FPS detected
          <br />
          Try reducing objects
        </div>
      )}
    </div>
  )
}

// Hook for performance optimization suggestions
export function usePerformanceOptimizations() {
  const objects = useStore(state => state.objects)
  const frameRate = useStore(state => state.frameRate)
  
  const suggestions = []
  
  if (frameRate < 30) {
    suggestions.push('Consider reducing the number of objects in the scene')
    suggestions.push('Enable LOD (Level of Detail) for distant objects')
    suggestions.push('Reduce shadow quality or disable shadows')
  }
  
  if (objects.length > 50) {
    suggestions.push('Large number of objects detected - consider object pooling')
  }
  
  if ('memory' in performance) {
    const memInfo = (performance as any).memory
    const usedMB = memInfo.usedJSHeapSize / 1048576
    
    if (usedMB > 100) {
      suggestions.push('High memory usage detected - check for memory leaks')
    }
  }
  
  return { suggestions, frameRate, objectCount: objects.length }
}