/**
 * Minimal Room Designer Application
 * Clean isometric 3D room designer with limited camera rotation
 */

class RoomDesigner {
    constructor() {
        // Three.js core
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        // Object management
        this.selectedObject = null;
        this.currentDesk = null;
        this.objects = [];
        
        // Camera control
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        
        // Camera settings for isometric view
        this.cameraRotation = 0;
        this.cameraDistance = 10; // Closer default distance
        this.cameraHeight = 6;
        
        // Initialize
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupScene();
        this.setupLights();
        this.setupRoom();
        this.setupControls();
        this.animate();
    }

    /**
     * Setup Three.js scene with isometric camera
     */
    setupScene() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xe8d7d0); // Soft peachy background

        // Orthographic camera for isometric view
        // Orthographic camera for isometric view
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 18; // Changed from 20 - slightly tighter view

this.camera = new THREE.OrthographicCamera(
    frustumSize * aspect / -2,
    frustumSize * aspect / 2,
    frustumSize / 2,
    frustumSize / -2,
    0.1,
    1000
);;
        
        this.updateCameraPosition();

        // Renderer with soft settings
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping; // Better colors
        this.renderer.toneMappingExposure = 1.2; // Slightly brighter
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    /**
     * Setup scene lighting
     */
    setupLights() {
        // Soft ambient light for base illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Main directional light for soft shadows (coming from top-right)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(8, 12, 6);
        directionalLight.castShadow = true;
        
        // Softer shadow settings
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -15;
        directionalLight.shadow.camera.right = 15;
        directionalLight.shadow.camera.top = 15;
        directionalLight.shadow.camera.bottom = -15;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.bias = -0.0005;
        
        this.scene.add(directionalLight);

        // Additional soft fill light from the front
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
        fillLight.position.set(-5, 8, 10);
        this.scene.add(fillLight);
    }

    /**
     * Create room geometry (floor and walls)
     */
    setupRoom() {
        // Floor with softer color
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf5e6d3, // Soft cream floor
            shininess: 10
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Wall material - softer colors
        const wallMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xfaf6f0, // Off-white walls
            shininess: 5
        });

        // Back wall
        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 12),
            wallMaterial
        );
        backWall.position.set(0, 6, -10);
        backWall.receiveShadow = true;
        this.scene.add(backWall);

        // Right wall (more visible in this angle)
        const rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 12),
            wallMaterial
        );
        rightWall.position.set(10, 6, 0);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.receiveShadow = true;
        this.scene.add(rightWall);
    }

    /**
     * Setup all controls and event listeners
     */
    setupControls() {
        const canvas = this.renderer.domElement;

        // Mouse controls
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        canvas.addEventListener('mouseup', () => this.onMouseUp());
        canvas.addEventListener('click', (e) => this.onMouseClick(e));
        
        // Touch controls for mobile
        canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        canvas.addEventListener('touchend', () => this.onTouchEnd());
        
        // Wheel for zoom
        canvas.addEventListener('wheel', (e) => this.onMouseWheel(e));

        // Desk selection buttons
        this.setupDeskButtons();

        // Property sliders
        this.setupPropertyControls();
    }

    /**
     * Setup desk selection buttons
     */
    setupDeskButtons() {
        document.querySelectorAll('.desk-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                document.querySelectorAll('.desk-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Load selected desk
                this.loadDesk(e.target.dataset.desk);
            });
        });
    }

    /**
     * Setup property control sliders
     */
    setupPropertyControls() {
        const rotationSlider = document.getElementById('rotationSlider');
        const scaleSlider = document.getElementById('scaleSlider');

        if (rotationSlider) {
            rotationSlider.addEventListener('input', (e) => {
                if (this.selectedObject && !this.selectedObject.userData.isDesk) {
                    this.selectedObject.rotation.y = THREE.MathUtils.degToRad(e.target.value);
                    document.getElementById('rotationValue').textContent = e.target.value + '°';
                }
            });
        }

        if (scaleSlider) {
            scaleSlider.addEventListener('input', (e) => {
                if (this.selectedObject && !this.selectedObject.userData.isDesk) {
                    const scale = e.target.value / 100;
                    this.selectedObject.scale.set(scale, scale, scale);
                    document.getElementById('scaleValue').textContent = e.target.value + '%';
                }
            });
        }
    }

    /**
     * Mouse down handler
     */
    onMouseDown(event) {
        if (event.button === 0) { // Left click
            this.isDragging = true;
            this.previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    }

    /**
     * Mouse move handler
     */
    onMouseMove(event) {
        if (this.isDragging) {
            const deltaX = event.clientX - this.previousMousePosition.x;
            
            // Limited rotation (only horizontal, -30 to 30 degrees for subtler movement)
            this.cameraRotation += deltaX * 0.003;
            this.cameraRotation = Math.max(-Math.PI/6, Math.min(Math.PI/6, this.cameraRotation));
            
            this.updateCameraPosition();
            
            this.previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    }

    /**
     * Mouse up handler
     */
    onMouseUp() {
        this.isDragging = false;
    }

    /**
     * Mouse click handler for object selection
     */
    onMouseClick(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Raycast to find intersected objects
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.objects, true);

        if (intersects.length > 0) {
            // Find the parent object
            let object = intersects[0].object;
            while (object.parent && !this.objects.includes(object)) {
                object = object.parent;
            }
            this.selectObject(object);
        } else {
            this.selectObject(null);
        }
    }

    /**
     * Touch start handler (mobile support)
     */
    onTouchStart(event) {
        if (event.touches.length === 1) {
            this.isDragging = true;
            this.previousMousePosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    }

    /**
     * Touch move handler (mobile support)
     */
    onTouchMove(event) {
        if (this.isDragging && event.touches.length === 1) {
            const deltaX = event.touches[0].clientX - this.previousMousePosition.x;
            
            this.cameraRotation += deltaX * 0.003;
            this.cameraRotation = Math.max(-Math.PI/6, Math.min(Math.PI/6, this.cameraRotation));
            
            this.updateCameraPosition();
            
            this.previousMousePosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    }

    /**
     * Touch end handler (mobile support)
     */
    onTouchEnd() {
        this.isDragging = false;
    }

    /**
     * Mouse wheel handler for zoom
     */
    onMouseWheel(event) {
        event.preventDefault();
        
        // Zoom limits
        const zoomSpeed = 0.1;
        const minZoom = 10; // Closer minimum for better detail
        const maxZoom = 20; // Not too far
        
        this.cameraDistance += event.deltaY * zoomSpeed * 0.01;
        this.cameraDistance = Math.max(minZoom, Math.min(maxZoom, this.cameraDistance));
        
        this.updateCameraPosition();
    }

    /**
     * Update camera position for isometric view
     */
    updateCameraPosition() {
    // More frontal view matching the reference image
    // Camera positioned lower and more straight-on
    const baseAngle = Math.PI / 8; // Reduced angle (22.5 degrees instead of 30)
    const x = Math.sin(baseAngle + this.cameraRotation) * this.cameraDistance * 0.5; // Reduced X offset
    const z = Math.cos(baseAngle + this.cameraRotation) * this.cameraDistance * 1.1; // Increased Z for more frontal
    
    // Lower camera position for that cozy room view
    const y = this.cameraDistance * 0.6; // Reduced from 0.8
    
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0.5, 0); // Look slightly lower (was 1)
    
    // Update orthographic camera zoom
    const zoom = 15 / this.cameraDistance;
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 20 / zoom;
    
    this.camera.left = frustumSize * aspect / -2;
    this.camera.right = frustumSize * aspect / 2;
    this.camera.top = frustumSize / 2;
    this.camera.bottom = frustumSize / -2;
    this.camera.updateProjectionMatrix();
}

    /**
     * Handle window resize
     */
    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const zoom = 15 / this.cameraDistance;
        const frustumSize = 20 / zoom;
        
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Toggle side panel
     */
    togglePanel() {
        const panel = document.getElementById('sidePanel');
        panel.classList.toggle('open');
    }

    /**
     * Load a desk model
     */
    loadDesk(deskType) {
        // Remove current desk if exists
        if (this.currentDesk) {
            this.scene.remove(this.currentDesk);
            const index = this.objects.indexOf(this.currentDesk);
            if (index > -1) {
                this.objects.splice(index, 1);
            }
        }

        // Create desk based on type
        const deskGeometry = new THREE.BoxGeometry(6, 0.2, 3);
        const deskMaterial = new THREE.MeshPhongMaterial({ 
            color: deskType === 'desk1' ? 0x8b6f47 : 
                   deskType === 'desk2' ? 0x4a4a4a : 0x2a2a2a
        });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.y = 3;
        desk.castShadow = true;
        desk.receiveShadow = true;
        desk.userData.isDesk = true;
        desk.userData.type = deskType;
        
        // Add legs
        const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3);
        const legMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        
        const legPositions = [
            [-2.8, 1.5, -1.3],
            [2.8, 1.5, -1.3],
            [-2.8, 1.5, 1.3],
            [2.8, 1.5, 1.3]
        ];
        
        const deskGroup = new THREE.Group();
        deskGroup.add(desk);
        
        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(...pos);
            leg.castShadow = true;
            deskGroup.add(leg);
        });
        
        deskGroup.userData.isDesk = true;
        deskGroup.userData.type = deskType;
        
        this.currentDesk = deskGroup;
        this.scene.add(deskGroup);
        this.objects.push(deskGroup);
    }

    /**
     * Add a model to the scene
     */
    addModel(type) {
        let geometry, material, mesh;
        
        // Create geometry based on type
        switch(type) {
            case 'monitor':
                geometry = new THREE.BoxGeometry(1.5, 1, 0.1);
                material = new THREE.MeshPhongMaterial({ color: 0x222222 });
                break;
            case 'keyboard':
                geometry = new THREE.BoxGeometry(1, 0.05, 0.4);
                material = new THREE.MeshPhongMaterial({ color: 0x333333 });
                break;
            case 'mouse':
                geometry = new THREE.BoxGeometry(0.2, 0.05, 0.3);
                material = new THREE.MeshPhongMaterial({ color: 0x444444 });
                break;
            case 'laptop':
                geometry = new THREE.BoxGeometry(1.2, 0.05, 0.8);
                material = new THREE.MeshPhongMaterial({ color: 0x666666 });
                break;
            case 'speakers':
                geometry = new THREE.BoxGeometry(0.4, 0.6, 0.4);
                material = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
                break;
            case 'headphones':
                geometry = new THREE.TorusGeometry(0.4, 0.1, 8, 16, Math.PI);
                material = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });
                break;
            case 'lamp':
                geometry = new THREE.CylinderGeometry(0.3, 0.3, 1);
                material = new THREE.MeshPhongMaterial({ color: 0xffff99 });
                break;
            case 'plant':
                geometry = new THREE.CylinderGeometry(0.2, 0.15, 0.5);
                material = new THREE.MeshPhongMaterial({ color: 0x228822 });
                break;
            case 'mug':
                geometry = new THREE.CylinderGeometry(0.15, 0.12, 0.2);
                material = new THREE.MeshPhongMaterial({ color: 0xffffff });
                break;
            case 'clock':
                geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05);
                material = new THREE.MeshPhongMaterial({ color: 0xdddddd });
                break;
            case 'books':
                geometry = new THREE.BoxGeometry(0.3, 0.4, 0.8);
                material = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
                break;
            case 'pen':
                geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.15);
                material = new THREE.MeshPhongMaterial({ color: 0x4444ff });
                break;
            default:
                geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                material = new THREE.MeshPhongMaterial({ color: 0x999999 });
        }
        
        mesh = new THREE.Mesh(geometry, material);
        
        // Position on desk or floor
        mesh.position.set(
            Math.random() * 4 - 2,
            this.currentDesk ? 3.2 : 0.5,
            Math.random() * 2 - 1
        );
        
        // Enable shadows
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData.type = type;
        
        // Add to scene and select
        this.scene.add(mesh);
        this.objects.push(mesh);
        this.selectObject(mesh);
    }

    /**
     * Select an object
     */
    selectObject(object) {
        // Deselect previous
        if (this.selectedObject) {
            if (this.selectedObject.material) {
                this.selectedObject.material.emissive = new THREE.Color(0x000000);
            }
        }
        
        this.selectedObject = object;
        
        if (object && !object.userData.isDesk) {
            // Highlight selected
            if (object.material) {
                object.material.emissive = new THREE.Color(0x444444);
            }
            
            // Update property panel
            this.updatePropertyPanel(object);
        } else {
            // Hide property panel
            document.getElementById('propertiesSection').style.display = 'none';
        }
    }

    /**
     * Update property panel with selected object values
     */
    updatePropertyPanel(object) {
        const propertiesSection = document.getElementById('propertiesSection');
        const rotationSlider = document.getElementById('rotationSlider');
        const rotationValue = document.getElementById('rotationValue');
        const scaleSlider = document.getElementById('scaleSlider');
        const scaleValue = document.getElementById('scaleValue');
        
        // Show properties section
        propertiesSection.style.display = 'block';
        
        // Update rotation
        const rotation = THREE.MathUtils.radToDeg(object.rotation.y);
        rotationSlider.value = rotation;
        rotationValue.textContent = Math.round(rotation) + '°';
        
        // Update scale
        const scale = object.scale.x * 100;
        scaleSlider.value = scale;
        scaleValue.textContent = Math.round(scale) + '%';
    }

    /**
     * Delete selected object
     */
    deleteSelected() {
        if (this.selectedObject && !this.selectedObject.userData.isDesk) {
            // Remove from objects array
            const index = this.objects.indexOf(this.selectedObject);
            if (index > -1) {
                this.objects.splice(index, 1);
            }
            
            // Remove from scene
            this.scene.remove(this.selectedObject);
            this.selectedObject = null;
            
            // Hide properties panel
            document.getElementById('propertiesSection').style.display = 'none';
        }
    }

    /**
     * Rotate camera left or right
     */
    rotateCamera(direction) {
        const rotationStep = Math.PI / 12; // Smaller rotation steps
        
        if (direction === 'left') {
            this.cameraRotation -= rotationStep;
        } else {
            this.cameraRotation += rotationStep;
        }
        
        // Limit rotation range to ±30 degrees
        this.cameraRotation = Math.max(-Math.PI/6, Math.min(Math.PI/6, this.cameraRotation));
        this.updateCameraPosition();
    }

    /**
     * Toggle day/night mode
     */
    toggleDayNight() {
        const currentColor = this.scene.background.getHex();
        if (currentColor === 0xe8d7d0) {
            // Night mode - darker but still soft
            this.scene.background = new THREE.Color(0x4a4458);
        } else {
            // Day mode - soft peachy
            this.scene.background = new THREE.Color(0xe8d7d0);
        }
    }

    /**
     * Toggle sound (placeholder)
     */
    toggleSound() {
        console.log('Sound toggled');
        // Add sound functionality here if needed
    }

    /**
     * Animation loop
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize application when DOM is loaded
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new RoomDesigner();
});