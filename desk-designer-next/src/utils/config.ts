// Performance and optimization configuration
import { PCFSoftShadowMap, PCFShadowMap, BasicShadowMap, ACESFilmicToneMapping, LinearToneMapping } from 'three'

export const PERFORMANCE_CONFIG = {
  // Target FPS for performance monitoring
  TARGET_FPS: 60,
  MIN_FPS: 30,
  
  // Render optimization
  ENABLE_RENDER_ON_DEMAND: true,
  ANIMATION_FRAME_LIMIT: 16, // ~60fps
  
  // Memory optimization
  MAX_OBJECTS_IN_SCENE: 100,
  MEMORY_WARNING_THRESHOLD: 100, // MB
  
  // Quality settings
  SHADOW_MAP_SIZE: 2048,
  ANTIALIAS: true,
  PIXEL_RATIO_MAX: 2,
  
  // LOD settings
  LOD_DISTANCES: {
    HIGH: 10,
    MEDIUM: 20,
    LOW: 30
  },
  
  // Camera settings
  CAMERA_FRUSTUM_SIZE: 16,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 100,
  
  // Interaction settings
  DRAG_RESPONSIVENESS: 8, // ms debounce
  HOVER_RESPONSIVENESS: 16, // ms debounce
  CLICK_THRESHOLD: 5, // pixels
  
  // Asset optimization
  ENABLE_DRACO_COMPRESSION: true,
  TEXTURE_MAX_SIZE: 1024,
  
  // Development settings
  SHOW_PERFORMANCE_MONITOR: process.env.NODE_ENV === 'development',
  ENABLE_STATS: process.env.NODE_ENV === 'development',
  LOG_PERFORMANCE_WARNINGS: process.env.NODE_ENV === 'development'
}

export const LIGHTING_PRESETS = {
  day: {
    ambient: { color: 0xfff4e6, intensity: 0.25 },
    sun: { 
      color: 0xffd4a0, 
      intensity: 0.6,
      position: [10, 15, 8] as [number, number, number]
    }
  },
  sunset: {
    ambient: { color: 0xfff0d4, intensity: 0.3 },
    sun: { 
      color: 0xffb366, 
      intensity: 0.8,
      position: [5, 8, 10] as [number, number, number]
    }
  },
  night: {
    ambient: { color: 0x404080, intensity: 0.4 },
    sun: { 
      color: 0x8080ff, 
      intensity: 0.3,
      position: [-5, 6, 8] as [number, number, number]
    }
  }
}

export const MATERIAL_QUALITY = {
  HIGH: {
    shadowMapType: PCFSoftShadowMap,
    shadowMapSize: 2048,
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 0.88
  },
  MEDIUM: {
    shadowMapType: PCFShadowMap,
    shadowMapSize: 1024,
    toneMapping: LinearToneMapping,
    toneMappingExposure: 1.0
  },
  LOW: {
    shadowMapType: BasicShadowMap,
    shadowMapSize: 512,
    toneMapping: LinearToneMapping,
    toneMappingExposure: 1.0
  }
}

// Adaptive quality based on performance
export function getAdaptiveQuality(fps: number) {
  if (fps >= 50) return MATERIAL_QUALITY.HIGH
  if (fps >= 35) return MATERIAL_QUALITY.MEDIUM
  return MATERIAL_QUALITY.LOW
}

// Performance optimization suggestions
export function getOptimizationSuggestions(metrics: {
  fps: number
  objectCount: number
  memoryUsage: number
}): string[] {
  const suggestions: string[] = []
  
  if (metrics.fps < PERFORMANCE_CONFIG.MIN_FPS) {
    suggestions.push('Frame rate is below optimal. Consider reducing object count or quality settings.')
  }
  
  if (metrics.objectCount > PERFORMANCE_CONFIG.MAX_OBJECTS_IN_SCENE) {
    suggestions.push('Too many objects in scene. Consider using object pooling or instancing.')
  }
  
  if (metrics.memoryUsage > PERFORMANCE_CONFIG.MEMORY_WARNING_THRESHOLD) {
    suggestions.push('High memory usage detected. Check for memory leaks or unused assets.')
  }
  
  return suggestions
}