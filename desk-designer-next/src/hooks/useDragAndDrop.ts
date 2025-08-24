import { useThree } from '@react-three/fiber'
import { useCallback, useRef } from 'react'
import { Vector2, Vector3, Plane, Raycaster } from 'three'
import { useStore } from '@/stores/useStore'
import { useDebouncedCallback } from './usePerformance'

export function useDragAndDrop() {
  const { camera, gl } = useThree()
  const isDragging = useRef(false)
  const dragPlane = useRef(new Plane(new Vector3(0, 1, 0), 0))
  const dragOffset = useRef(new Vector3())
  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())
  const startPosition = useRef(new Vector3())
  
  const selectedObject = useStore(state => state.selectedObject)
  const updateObject = useStore(state => state.updateObject)
  const surfaces = useStore(state => state.surfaces)
  const requestRender = useStore(state => state.requestRender)
  
  // Start dragging
  const startDrag = useCallback((event: PointerEvent) => {
    if (!selectedObject) return
    
    isDragging.current = true
    startPosition.current.copy(selectedObject.position)
    
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    )
    
    raycaster.current.setFromCamera(mouse.current, camera)
    
    // Set drag plane at object's current Y position
    dragPlane.current.setFromNormalAndCoplanarPoint(
      new Vector3(0, 1, 0),
      selectedObject.position
    )
    
    // Calculate intersection point and offset
    const intersectPoint = new Vector3()
    raycaster.current.ray.intersectPlane(dragPlane.current, intersectPoint)
    
    if (intersectPoint) {
      dragOffset.current.copy(selectedObject.position).sub(intersectPoint)
    }
    
    gl.domElement.style.cursor = 'grabbing'
    requestRender()
  }, [selectedObject, camera, gl, requestRender])
  
  // Optimized drag movement with surface snapping
  const handleDrag = useDebouncedCallback((event: PointerEvent) => {
    if (!isDragging.current || !selectedObject) return
    
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    )
    
    raycaster.current.setFromCamera(mouse.current, camera)
    
    // Find intersection with drag plane
    const intersectPoint = new Vector3()
    const hasIntersection = raycaster.current.ray.intersectPlane(dragPlane.current, intersectPoint)
    
    if (hasIntersection && intersectPoint) {
      const newPosition = intersectPoint.add(dragOffset.current)
      
      // Surface detection for smart snapping
      const surfaceRay = new Raycaster(
        new Vector3(newPosition.x, newPosition.y + 1, newPosition.z),
        new Vector3(0, -1, 0)
      )
      
      const surfaceIntersects = surfaceRay.intersectObjects(surfaces, true)
      let targetY = 0 // Default floor level
      
      // Find closest valid surface
      for (const intersect of surfaceIntersects) {
        if (intersect.object !== selectedObject.object) {
          targetY = intersect.point.y
          break
        }
      }
      
      // Update object position with surface snapping
      const finalPosition = new Vector3(newPosition.x, targetY, newPosition.z)
      
      updateObject(selectedObject.id, {
        position: finalPosition
      })
      
      requestRender()
    }
  }, 8) // 120fps for smooth dragging
  
  // End dragging
  const endDrag = useCallback(() => {
    if (!isDragging.current) return
    
    isDragging.current = false
    gl.domElement.style.cursor = 'default'
    
    // Snap to final position
    if (selectedObject) {
      requestRender()
    }
  }, [gl, selectedObject, requestRender])
  
  // Setup event listeners
  const setupDragListeners = useCallback(() => {
    const canvas = gl.domElement
    
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button === 0 && selectedObject) { // Left mouse button
        startDrag(e)
        e.preventDefault()
      }
    }
    
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging.current) {
        handleDrag(e)
        e.preventDefault()
      }
    }
    
    const handlePointerUp = (e: PointerEvent) => {
      if (e.button === 0) { // Left mouse button
        endDrag()
        e.preventDefault()
      }
    }
    
    canvas.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
    }
  }, [startDrag, handleDrag, endDrag, gl, selectedObject])
  
  return {
    isDragging: isDragging.current,
    setupDragListeners,
    startDrag,
    endDrag
  }
}