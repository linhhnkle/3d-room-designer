'use client'

import { useCameraControls } from '../Scene/Camera'
import { useStore } from '@/stores/useStore'

export function Controls() {
  const { rotateLeft } = useCameraControls()
  const toggleColorPanel = useStore(state => state.toggleColorPanel)
  const toggleTexturePanel = useStore(state => state.toggleTexturePanel)
  const toggleFurnitureMenu = useStore(state => state.toggleFurnitureMenu)
  
  // Reset scene function
  const resetScene = () => {
    // Clear all objects except room
    useStore.setState(state => ({
      objects: [],
      selectedObject: null,
      hoveredObject: null,
      renderRequested: true
    }))
  }
  
  // Toggle time of day (placeholder)
  const toggleTimeOfDay = () => {
    // Implementation will be added
  }
  
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex gap-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg">
        <ControlButton 
          onClick={rotateLeft}
          title="Rotate Left"
          icon="↶"
        />
        <ControlButton 
          onClick={toggleColorPanel}
          title="Change Colors"
          icon="🎨"
        />
        <ControlButton 
          onClick={toggleTexturePanel}
          title="Change Textures"
          icon="🪵"
        />
        <ControlButton 
          onClick={toggleFurnitureMenu}
          title="Add Furniture"
          icon="🛋️"
        />
        <ControlButton 
          onClick={toggleTimeOfDay}
          title="Time of Day"
          icon="☀️"
        />
        <ControlButton 
          onClick={resetScene}
          title="Reset Scene"
          icon="🔄"
        />
      </div>
    </div>
  )
}

interface ControlButtonProps {
  onClick: () => void
  title: string
  icon: string
  disabled?: boolean
}

function ControlButton({ onClick, title, icon, disabled = false }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        w-11 h-11 flex items-center justify-center
        bg-[#f5e6d3]/80 text-[#8b6f47] text-xl
        rounded-lg transition-all duration-200
        hover:bg-[#f5e6d3] hover:shadow-md hover:scale-105
        active:bg-[#f5e6d3]/90 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100 disabled:hover:shadow-none
      `}
    >
      {icon}
    </button>
  )
}