'use client'

import { Vector3 } from 'three'
import { useStore } from '@/stores/useStore'

export function Toolbar() {
  const selectedObject = useStore(state => state.selectedObject)
  const updateObject = useStore(state => state.updateObject)
  const removeObject = useStore(state => state.removeObject)
  const toggleObjectColorPanel = useStore(state => state.toggleObjectColorPanel)
  
  if (!selectedObject) {
    return null
  }
  
  // Toolbar actions
  const scaleUp = () => {
    const currentScale = selectedObject.scale.x
    const newScale = Math.min(currentScale * 1.1, 8)
    const newScaleVector = new Vector3(newScale, newScale, newScale)
    
    updateObject(selectedObject.id, { scale: newScaleVector })
  }
  
  const scaleDown = () => {
    const currentScale = selectedObject.scale.x
    const newScale = Math.max(currentScale * 0.9, 0.2)
    const newScaleVector = new Vector3(newScale, newScale, newScale)
    
    updateObject(selectedObject.id, { scale: newScaleVector })
  }
  
  const rotateObject = () => {
    const newRotation = selectedObject.rotation + Math.PI / 4
    updateObject(selectedObject.id, { rotation: newRotation })
  }
  
  const duplicateObject = () => {
    // Create duplicate with slight offset
    const newPosition = selectedObject.position.clone()
    newPosition.x += 2
    
    const duplicateData = {
      ...selectedObject,
      id: `${selectedObject.type}-${Date.now()}`,
      position: newPosition
    }
    
    useStore.getState().addObject(duplicateData)
  }
  
  const deleteObject = () => {
    removeObject(selectedObject.id)
  }
  
  return (
    <div className="fixed bottom-20 right-5 z-20 transition-all duration-200">
      <div className="flex gap-1 bg-white/95 backdrop-blur-md p-1 rounded-lg shadow-lg">
        <ToolbarButton
          onClick={scaleDown}
          title="Scale Down"
          icon="➖"
        />
        <ToolbarButton
          onClick={scaleUp}
          title="Scale Up"
          icon="➕"
        />
        <ToolbarButton
          onClick={duplicateObject}
          title="Duplicate"
          icon="📋"
        />
        <ToolbarButton
          onClick={toggleObjectColorPanel}
          title="Change Colors"
          icon="🎨"
        />
        <ToolbarButton
          onClick={rotateObject}
          title="Rotate 45°"
          icon="🔄"
        />
        <ToolbarButton
          onClick={deleteObject}
          title="Delete"
          icon="🗑️"
          variant="danger"
        />
      </div>
    </div>
  )
}

interface ToolbarButtonProps {
  onClick: () => void
  title: string
  icon: string
  variant?: 'default' | 'danger'
}

function ToolbarButton({ onClick, title, icon, variant = 'default' }: ToolbarButtonProps) {
  const baseClasses = `
    w-8 h-8 flex items-center justify-center text-sm
    rounded-md transition-all duration-150
    hover:scale-105 active:scale-95
  `
  
  const variantClasses = variant === 'danger' 
    ? 'bg-red-100 text-red-600 hover:bg-red-200'
    : 'bg-[#f5e6d3]/80 text-[#8b6f47] hover:bg-[#f5e6d3]'
  
  return (
    <button
      onClick={onClick}
      title={title}
      className={`${baseClasses} ${variantClasses}`}
    >
      {icon}
    </button>
  )
}