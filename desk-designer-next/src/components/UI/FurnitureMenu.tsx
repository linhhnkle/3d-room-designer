'use client'

import { useState, useMemo } from 'react'
import { Vector3 } from 'three'
import { useStore } from '@/stores/useStore'
import { ObjectLoader } from '../Objects/ObjectLoader'

// Furniture categories and items
const FURNITURE_CATEGORIES = {
  main: {
    title: 'Categories',
    items: [
      { id: 'desks', name: 'Desks', icon: '🪑', emoji: '🪑' },
      { id: 'chairs', name: 'Chairs', icon: '🪑', emoji: '🪑' },
      { id: 'plants', name: 'Plants', icon: '🌿', emoji: '🌿' },
      { id: 'electronics', name: 'Electronics', icon: '💻', emoji: '💻' }
    ]
  },
  desks: {
    title: 'Desks',
    items: [
      { id: 'desk', name: 'Office Desk', type: 'desk', thumbnail: '/Thumbnails/desk1.png' },
      { id: 'desk2', name: 'Modern Desk', type: 'desk', thumbnail: '/Thumbnails/desk2.png' },
      { id: 'desk3', name: 'Corner Desk', type: 'desk', thumbnail: '/Thumbnails/desk3.png' }
    ]
  },
  chairs: {
    title: 'Chairs',
    items: [
      { id: 'chair', name: 'Office Chair', type: 'chair', thumbnail: '/Thumbnails/chair.png' },
      { id: 'chair2', name: 'Ergonomic Chair', type: 'chair', thumbnail: '/Thumbnails/chair2.png' }
    ]
  },
  plants: {
    title: 'Plants',
    items: [
      { id: 'plant', name: 'Plant', type: 'plant', thumbnail: '/Thumbnails/plant1.png' },
      { id: 'plant2', name: 'Succulent', type: 'plant', thumbnail: '/Thumbnails/plant2.png' },
      { id: 'plant3', name: 'Palm Tree', type: 'plant', thumbnail: '/Thumbnails/plant3.png' }
    ]
  },
  electronics: {
    title: 'Electronics',
    items: [
      { id: 'monitor', name: 'Monitor', type: 'monitor', thumbnail: '/Thumbnails/monitor.png' },
      { id: 'laptop', name: 'Laptop', type: 'laptop', thumbnail: '/Thumbnails/laptop.png' }
    ]
  }
}

export function FurnitureMenu() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddingObject, setIsAddingObject] = useState(false)
  
  const isFurnitureMenuOpen = useStore(state => state.isFurnitureMenuOpen)
  const currentSection = useStore(state => state.currentSection)
  const setCurrentSection = useStore(state => state.setCurrentSection)
  const toggleFurnitureMenu = useStore(state => state.toggleFurnitureMenu)
  const addObject = useStore(state => state.addObject)
  
  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchTerm || currentSection === 'main') {
      return FURNITURE_CATEGORIES[currentSection as keyof typeof FURNITURE_CATEGORIES]?.items || []
    }
    
    const items = FURNITURE_CATEGORIES[currentSection as keyof typeof FURNITURE_CATEGORIES]?.items || []
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, currentSection])
  
  // Get spawn position for new objects
  const getSpawnPosition = (type: string): Vector3 => {
    const smallItems = ['monitor', 'laptop', 'plant']
    
    // Small items spawn on surfaces if available
    if (smallItems.includes(type)) {
      // For now, spawn at origin - surface detection will be added later
      return new Vector3(0, 0, 0)
    }
    
    // Large items spawn on floor
    return new Vector3(
      Math.random() * 6 - 3, // Random X between -3 and 3
      0,
      Math.random() * 6 - 3  // Random Z between -3 and 3
    )
  }
  
  // Handle object addition
  const handleAddObject = async (type: string) => {
    if (isAddingObject) return
    
    setIsAddingObject(true)
    
    try {
      const position = getSpawnPosition(type)
      
      // Add object through ObjectLoader component
      const objectData = {
        id: `${type}-${Date.now()}`,
        object: null as any, // Will be set by ObjectLoader
        type,
        position,
        scale: new Vector3(1, 1, 1),
        rotation: 0
      }
      
      // The ObjectLoader component will handle the actual object creation
      // For now, we'll trigger the object creation directly
      // This will be replaced with a more elegant solution
      
    } catch (error) {
      console.error('Error adding object:', error)
    } finally {
      setIsAddingObject(false)
      toggleFurnitureMenu() // Close menu after adding
    }
  }
  
  // Handle navigation
  const navigateToSection = (sectionId: string) => {
    setCurrentSection(sectionId)
    setSearchTerm('')
  }
  
  const navigateBack = () => {
    setCurrentSection('main')
    setSearchTerm('')
  }
  
  if (!isFurnitureMenuOpen) return null
  
  const currentCategory = FURNITURE_CATEGORIES[currentSection as keyof typeof FURNITURE_CATEGORIES]
  
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-96 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {currentSection !== 'main' && (
              <button
                onClick={navigateBack}
                className="p-1 text-[#8b6f47] hover:bg-[#f5e6d3] rounded-lg transition-colors"
              >
                ←
              </button>
            )}
            <h3 className="text-lg font-semibold text-[#8b6f47]">
              {currentCategory?.title || 'Furniture'}
            </h3>
          </div>
          <button
            onClick={toggleFurnitureMenu}
            className="p-1 text-[#8b6f47] hover:bg-[#f5e6d3] rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Search */}
        {currentSection !== 'main' && (
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search furniture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-[#f5e6d3]/30 border border-[#e8d5c4] rounded-lg text-[#8b6f47] placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#8b6f47]/30"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <div key={item.id}>
                {currentSection === 'main' ? (
                  <CategoryButton
                    item={item}
                    onClick={() => navigateToSection(item.id)}
                  />
                ) : (
                  <FurnitureButton
                    item={item}
                    onClick={() => handleAddObject(item.type!)}
                    disabled={isAddingObject}
                  />
                )}
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && searchTerm && (
            <div className="text-center py-8 text-[#8b6f47]/60">
              No items found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Category button for main menu
function CategoryButton({ item, onClick }: { item: any, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-[#f5e6d3]/30 hover:bg-[#f5e6d3]/50 rounded-xl transition-colors group"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl group-hover:scale-110 transition-transform">
          {item.emoji}
        </span>
        <span className="text-sm font-medium text-[#8b6f47]">
          {item.name}
        </span>
      </div>
    </button>
  )
}

// Furniture item button
function FurnitureButton({ 
  item, 
  onClick, 
  disabled 
}: { 
  item: any
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full p-3 bg-[#f5e6d3]/30 hover:bg-[#f5e6d3]/50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex flex-col items-center gap-2">
        {item.thumbnail ? (
          <div className="w-12 h-12 bg-[#e8d5c4] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <img 
              src={item.thumbnail} 
              alt={item.name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling!.textContent = '📦'
              }}
            />
            <span className="hidden text-xl">📦</span>
          </div>
        ) : (
          <div className="w-12 h-12 bg-[#e8d5c4] rounded-lg flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            📦
          </div>
        )}
        <span className="text-xs font-medium text-[#8b6f47] text-center">
          {item.name}
        </span>
      </div>
    </button>
  )
}