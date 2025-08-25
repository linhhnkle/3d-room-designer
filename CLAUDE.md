# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development Server
- `node server.js` - Start local development server on port 3002
- The server serves `desk-designer-enhanced.html` as the default page
- Includes CORS headers and MIME type handling for 3D models (.glb) and assets

### Vercel Development/Deployment
- `npm run dev` - Start Vercel development server
- `npm run deploy` - Deploy to Vercel production
- Vercel configuration handles serverless API functions and CORS headers

### Alternative Local Server
- `python -m http.server 8000` - Alternative Python server
- Any local web server will work due to static file nature

## Project Architecture

### Core Application Structure
The project is a **3D Room Designer** built with vanilla JavaScript and Three.js:

- **Main Applications**: 
  - `index.html` - GitHub Pages version
  - `desk-designer-enhanced.html` - Enhanced version served by local server
  - `desk-designer.html` - Alternative version with similar functionality
  - **Note**: Each HTML file contains its own embedded RoomDesigner class implementation

- **Dual Environment Support**:
  - **Static Hosting** (GitHub Pages): Uses `furniture-catalog.json` for furniture metadata
  - **Dynamic Server** (Local/Vercel): Uses `api/list-directory.js` for live folder scanning
  - Server automatically falls back to static catalog in serverless environments

### 3D Asset Organization
- **Models**: `Furniture/` directory with `.glb` files organized by category (Chairs/, Desks/, Electronics/, etc.)
- **Thumbnails**: `Thumbnails/` directory mirrors furniture structure with `.png` previews
- **Catalog**: `furniture-catalog.json` defines furniture metadata, scaling, placement rules, and categorization

### Key Technical Components
- **Three.js Setup**: Isometric camera with controlled rotation, WebGL renderer
- **Object Management**: Drag-and-drop placement, surface detection, wall mounting
- **Asset Loading**: GLTF/GLB model loader with caching
- **Dynamic Catalog**: Server API for live folder scanning vs static JSON fallback

### Development Environment Detection
The application automatically adapts between:
1. **Local Development**: Full filesystem access via Node.js server
2. **Serverless Deployment**: Static catalog mode for Vercel/similar platforms
3. **Static Hosting**: Pure client-side operation for GitHub Pages

### Furniture System Architecture
- Categories: Desks, Chairs, Electronics, Plants, Storage, Sofas
- Properties: `isSurface` (can hold objects), `placeOnSurface` (needs surface), wall-mountable
- Scaling and positioning handled per-item via catalog configuration
- Multi-part object support for color customization (keyboards, furniture components)

## Important File Relationships
- Server defaults to `desk-designer-enhanced.html` (not `index.html`)
- `vercel.json` configures serverless functions and CORS for deployment
- `api/list-directory.js` provides dynamic folder scanning with serverless fallback logic
- Three.js library included as `three.min.js` (r128)