import { useThree } from '@react-three/fiber'
import { useCallback, useMemo, useRef } from 'react'
import { Object3D, Raycaster, Vector2, Vector3, Mesh, Box3 } from 'three'
import { useStore } from '@/stores/useStore'
import { useDebouncedCallback } from './usePerformance'

export function useObjectSelection() {
  const { camera, scene, gl } = useThree()
  const raycaster = useMemo(() => new Raycaster(), [])
  const mouse = useMemo(() => new Vector2(), [])
  const dragOffset = useRef<Vector3>(new Vector3())
  const isDragging = useRef(false)
  
  const selectedObject = useStore(state => state.selectedObject)
  const selectObject = useStore(state => state.selectObject)
  const objects = useStore(state => state.objects)
  const surfaces = useStore(state => state.surfaces)
  const requestRender = useStore(state => state.requestRender)
  
  // Spatial indexing for faster selection
  const spatialIndex = useMemo(() => {
    const index = new Map<string, { object: Object3D; bounds: Box3 }>()
    objects.forEach(obj => {
      const bounds = new Box3().setFromObject(obj.object)
      index.set(obj.id, { object: obj.object, bounds })
    })
    return index
  }, [objects])
  
  // Optimized raycast with spatial culling
  const raycastObjects = useCallback((point: Vector2): Object3D | null => {
    mouse.copy(point)
    raycaster.setFromCamera(mouse, camera)
    
    // Pre-filter objects using spatial bounds
    const candidates: Object3D[] = []
    spatialIndex.forEach(({ object, bounds }) => {
      if (raycaster.ray.intersectsBox(bounds)) {
        candidates.push(object)
      }
    })
    
    if (candidates.length === 0) return null
    
    const intersects = raycaster.intersectObjects(candidates, true)
    return intersects.length > 0 ? intersects[0].object : null
  }, [camera, raycaster, mouse, spatialIndex])
  
  // Debounced hover detection
  const handleHover = useDebouncedCallback((event: PointerEvent) => {
    const rect = gl.domElement.getBoundingClientRect()
    const point = new Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    )
    
    const hitObject = raycastObjects(point)
    // Update hover state if needed
    requestRender()
  }, 16) // ~60fps
  
  // Optimized selection
  const handleSelect = useCallback((event: PointerEvent) => {
    if (isDragging.current) return
    
    const rect = gl.domElement.getBoundingClientRect()
    const point = new Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    )
    
    const hitObject = raycastObjects(point)
    
    if (hitObject) {
      // Find the object data from our store
      const objectData = objects.find(obj => 
        obj.object === hitObject || obj.object.getObjectById(hitObject.id)
      )
      
      if (objectData) {
        selectObject(objectData)
        
        // Calculate drag offset for smooth dragging
        mouse.copy(point)
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObject(hitObject, true)
        
        if (intersects.length > 0) {
          dragOffset.current.copy(objectData.position).sub(intersects[0].point)
        }
      }
    } else {
      selectObject(null)
    }
    
    requestRender()
  }, [raycastObjects, objects, selectObject, camera, raycaster, mouse, requestRender])
  
  // Surface detection for smart placement
  const findSurface = useCallback((position: Vector3): { surface: Object3D; y: number } | null => {
    const downRay = new Raycaster(
      new Vector3(position.x, position.y + 1, position.z),
      new Vector3(0, -1, 0)
    )
    
    const surfaceIntersects = downRay.intersectObjects(surfaces, true)
    
    for (const intersect of surfaceIntersects) {
      if (intersect.object !== selectedObject?.object) {
        return {
          surface: intersect.object,
          y: intersect.point.y
        }
      }
    }
    
    return { surface: surfaces[0], y: 0 } // Default to floor
  }, [surfaces, selectedObject])
  
  return {
    handleSelect,
    handleHover,
    findSurface,
    selectedObject,
    isDragging: isDragging.current
  }
}