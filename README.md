# 3D Room Designer

A web-based 3D room designer built with Three.js that allows users to design and customize virtual rooms with furniture, electronics, and decorations.

![3D Room Designer](https://img.shields.io/badge/Three.js-r128-brightgreen) ![Vercel Ready](https://img.shields.io/badge/Vercel-Ready-black)

## 🌟 Features

- **3D Room Visualization**: Interactive 3D room with realistic lighting and shadows
- **Drag & Drop Interface**: Easy furniture placement with intuitive controls
- **Wall Mounting**: Hang decorations and monitors on walls with proper orientation
- **Color Customization**: Multi-part object coloring (keyboards, furniture, etc.)
- **Extensive Furniture Library**: 
  - 🪑 Chairs (5 models)
  - 🏢 Desks (5 models including standing desk)
  - 💻 Electronics (computers, monitors, speakers, keyboards)
  - 🌿 Plants (5 different plants including cactus)
  - 🛋️ Sofas
  - 📚 Storage (cabinets and accessories)
- **Responsive Design**: Works on desktop and tablet devices
- **Performance Optimized**: Efficient rendering with model caching

## 🚀 Live Demo

### GitHub Pages
Visit the live demo at: `https://linhhnkle.github.io/3d-room-designer/`

### Vercel Deployment
Alternatively, deploy to Vercel for enhanced performance with serverless functions.

## 🛠️ Local Development

### Prerequisites
- Modern web browser with WebGL support
- Local web server (for loading 3D models)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/linhhnkle/3d-room-designer.git
   cd 3d-room-designer
   ```

2. Start a local web server:
   ```bash
   # Using Node.js (included server)
   node server.js
   # Opens on http://localhost:3002
   
   # Or using Python
   python -m http.server 8000
   # Opens on http://localhost:8000
   
   # Or using any other local server
   ```

3. Open your browser and navigate to the local server URL

## 📁 Project Structure

```
3d-room-designer/
├── index.html                 # Main application file
├── server.js                  # Node.js development server
├── api/                       # Vercel serverless functions
│   └── list-directory.js      # Directory listing API
├── Furniture/                 # 3D models (.glb files)
│   ├── Chairs/
│   ├── Desks/
│   ├── Electronics/
│   ├── Plants/
│   ├── Sofas/
│   └── Storage/
├── Thumbnails/               # Preview images
├── furniture-catalog.json   # Furniture metadata
├── vercel.json             # Vercel deployment config
└── package.json           # Project metadata
```

## 🎮 How to Use

1. **Add Furniture**: Click on furniture categories in the left panel
2. **Place Objects**: Drag objects into the room
3. **Wall Mounting**: Drag monitors and decorations onto walls
4. **Customize Colors**: Select objects and use the color picker
5. **Move Objects**: Click and drag to reposition
6. **Delete Objects**: Select and press Delete key

### Keyboard Shortcuts
- `Delete`: Remove selected object
- `Mouse Wheel`: Zoom in/out
- `Left Click + Drag`: Rotate camera
- `Right Click + Drag`: Pan camera

## 🔧 Technical Details

- **Framework**: Vanilla JavaScript with Three.js r128
- **3D Engine**: Three.js with WebGL renderer
- **Model Format**: GLTF/GLB for 3D models
- **Deployment**: Vercel-ready with serverless API
- **Browser Support**: Modern browsers with WebGL 2.0

## 📦 Deployment Options

### GitHub Pages
1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select "main" branch and "/" (root)
4. Your site will be available at `https://linhhnkle.github.io/3d-room-designer/`

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically with zero configuration
3. Includes serverless API for enhanced functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] Save/Load room configurations
- [ ] More furniture categories
- [ ] Lighting controls
- [ ] Room size customization
- [ ] Export to different formats
- [ ] Multi-room support

---

Built with ❤️ using Three.js and modern web technologies.