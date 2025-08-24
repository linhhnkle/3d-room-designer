import { create } from 'zustand'
import { Object3D, Vector3 } from 'three'

interface ObjectData {
  id: string
  object: Object3D
  type: string
  position: Vector3
  scale: Vector3
  rotation: number
}

interface StoreState {
  // Scene state
  objects: ObjectData[]
  selectedObject: ObjectData | null
  hoveredObject: ObjectData | null
  surfaces: Object3D[]
  
  // UI state
  isColorPanelOpen: boolean
  isTexturePanelOpen: boolean
  isFurnitureMenuOpen: boolean
  isObjectColorPanelOpen: boolean
  currentSection: string
  
  // Camera state
  cameraPosition: Vector3
  cameraRotation: number
  
  // Performance state
  renderRequested: boolean
  frameRate: number
  
  // Actions
  addObject: (object: ObjectData) => void
  removeObject: (id: string) => void
  selectObject: (object: ObjectData | null) => void
  updateObject: (id: string, updates: Partial<ObjectData>) => void
  
  // UI actions
  toggleColorPanel: () => void
  toggleTexturePanel: () => void
  toggleFurnitureMenu: () => void
  toggleObjectColorPanel: () => void
  setCurrentSection: (section: string) => void
  
  // Performance actions
  requestRender: () => void
  setFrameRate: (fps: number) => void
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  objects: [],
  selectedObject: null,
  hoveredObject: null,
  surfaces: [],
  
  isColorPanelOpen: false,
  isTexturePanelOpen: false,
  isFurnitureMenuOpen: false,
  isObjectColorPanelOpen: false,
  currentSection: 'main',
  
  cameraPosition: new Vector3(12, 8, 12),
  cameraRotation: 0,
  
  renderRequested: false,
  frameRate: 60,
  
  // Actions
  addObject: (object) => 
    set((state) => ({ 
      objects: [...state.objects, object],
      renderRequested: true
    })),
    
  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter(obj => obj.id !== id),
      selectedObject: state.selectedObject?.id === id ? null : state.selectedObject,
      renderRequested: true
    })),
    
  selectObject: (object) =>
    set(() => ({
      selectedObject: object,
      renderRequested: true
    })),
    
  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map(obj => 
        obj.id === id ? { ...obj, ...updates } : obj
      ),
      renderRequested: true
    })),
    
  // UI actions
  toggleColorPanel: () => 
    set((state) => ({ 
      isColorPanelOpen: !state.isColorPanelOpen,
      isTexturePanelOpen: false,
      isFurnitureMenuOpen: false
    })),
    
  toggleTexturePanel: () => 
    set((state) => ({ 
      isTexturePanelOpen: !state.isTexturePanelOpen,
      isColorPanelOpen: false,
      isFurnitureMenuOpen: false
    })),
    
  toggleFurnitureMenu: () => 
    set((state) => ({ 
      isFurnitureMenuOpen: !state.isFurnitureMenuOpen,
      isColorPanelOpen: false,
      isTexturePanelOpen: false
    })),
    
  toggleObjectColorPanel: () => 
    set((state) => ({ 
      isObjectColorPanelOpen: !state.isObjectColorPanelOpen
    })),
    
  setCurrentSection: (section) =>
    set(() => ({ currentSection: section })),
    
  // Performance actions
  requestRender: () =>
    set(() => ({ renderRequested: true })),
    
  setFrameRate: (fps) =>
    set(() => ({ frameRate: fps })),
}))