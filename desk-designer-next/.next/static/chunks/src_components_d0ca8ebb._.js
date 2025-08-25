(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Scene/Room.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Room",
    ()=>Room,
    "useRoomColors",
    ()=>useRoomColors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/useStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
// Pre-create geometries and materials for better performance
const FLOOR_GEOMETRY = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](20, 20);
const WALL_GEOMETRY = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](20, 8);
// Shared materials to reduce memory usage
const createFloorMaterial = ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
        color: 0xd4b896,
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
    });
const createWallMaterial = ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
        color: 0xe8dcc6,
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
    });
function Room() {
    _s();
    const floorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const backWallRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const leftWallRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const surfaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Room.useStore[surfaces]": (state)=>state.surfaces
    }["Room.useStore[surfaces]"]);
    const requestRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Room.useStore[requestRender]": (state)=>state.requestRender
    }["Room.useStore[requestRender]"]);
    // Memoized materials
    const floorMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Room.useMemo[floorMaterial]": ()=>createFloorMaterial()
    }["Room.useMemo[floorMaterial]"], []);
    const wallMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Room.useMemo[wallMaterial]": ()=>createWallMaterial()
    }["Room.useMemo[wallMaterial]"], []);
    // Register surfaces when components mount
    const registerSurface = (mesh)=>{
        if (mesh && !surfaces.includes(mesh)) {
            surfaces.push(mesh);
            requestRender();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        name: "room",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: (mesh)=>{
                    floorRef.current = mesh;
                    registerSurface(mesh);
                },
                geometry: FLOOR_GEOMETRY,
                material: floorMaterial,
                "rotation-x": -Math.PI / 2,
                position: [
                    0,
                    0,
                    0
                ],
                receiveShadow: true,
                userData: {
                    isFloor: true,
                    isSurface: true
                },
                name: "floor"
            }, void 0, false, {
                fileName: "[project]/src/components/Scene/Room.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: (mesh)=>{
                    backWallRef.current = mesh;
                    registerSurface(mesh);
                },
                geometry: WALL_GEOMETRY,
                material: wallMaterial,
                position: [
                    0,
                    4,
                    -10
                ],
                receiveShadow: true,
                userData: {
                    isWall: true
                },
                name: "backWall"
            }, void 0, false, {
                fileName: "[project]/src/components/Scene/Room.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: (mesh)=>{
                    leftWallRef.current = mesh;
                    registerSurface(mesh);
                },
                geometry: WALL_GEOMETRY,
                material: wallMaterial,
                position: [
                    -10,
                    4,
                    0
                ],
                "rotation-y": Math.PI / 2,
                receiveShadow: true,
                userData: {
                    isWall: true
                },
                name: "leftWall"
            }, void 0, false, {
                fileName: "[project]/src/components/Scene/Room.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Scene/Room.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(Room, "zaVSX8AXWxkb6IVyiCs8ZGM2bdA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = Room;
function useRoomColors() {
    const updateFloorColor = (color)=>{
    // Implementation will be added when color system is integrated
    };
    const updateWallColor = (color)=>{
    // Implementation will be added when color system is integrated
    };
    return {
        updateFloorColor,
        updateWallColor
    };
}
var _c;
__turbopack_context__.k.register(_c, "Room");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Scene/Lights.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lights",
    ()=>Lights,
    "SHADOW_CONFIG",
    ()=>SHADOW_CONFIG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Helper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Helper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Lights(param) {
    let { timeOfDay = 'day', showHelpers = false } = param;
    _s();
    const sunLightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ambientLightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Show light helpers in development
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Helper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHelper"])(showHelpers && sunLightRef, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLightHelper"], 1);
    // Memoized light configurations for different times of day
    const lightConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Lights.useMemo[lightConfig]": ()=>{
            switch(timeOfDay){
                case 'sunset':
                    return {
                        ambient: {
                            color: 0xfff0d4,
                            intensity: 0.3
                        },
                        sun: {
                            color: 0xffb366,
                            intensity: 0.8,
                            position: [
                                5,
                                8,
                                10
                            ]
                        }
                    };
                case 'night':
                    return {
                        ambient: {
                            color: 0x404080,
                            intensity: 0.4
                        },
                        sun: {
                            color: 0x8080ff,
                            intensity: 0.3,
                            position: [
                                -5,
                                6,
                                8
                            ]
                        }
                    };
                default:
                    return {
                        ambient: {
                            color: 0xfff4e6,
                            intensity: 0.25
                        },
                        sun: {
                            color: 0xffd4a0,
                            intensity: 0.6,
                            position: [
                                10,
                                15,
                                8
                            ]
                        }
                    };
            }
        }
    }["Lights.useMemo[lightConfig]"], [
        timeOfDay
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        name: "lights",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                ref: ambientLightRef,
                color: lightConfig.ambient.color,
                intensity: lightConfig.ambient.intensity
            }, void 0, false, {
                fileName: "[project]/src/components/Scene/Lights.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                ref: sunLightRef,
                color: lightConfig.sun.color,
                intensity: lightConfig.sun.intensity,
                position: lightConfig.sun.position,
                // castShadow
                "shadow-mapSize-width": 1024,
                "shadow-mapSize-height": 1024,
                "shadow-camera-near": 0.1,
                "shadow-camera-far": 50,
                "shadow-camera-left": -15,
                "shadow-camera-right": 15,
                "shadow-camera-top": 15,
                "shadow-camera-bottom": -15,
                "shadow-radius": 10,
                "shadow-blurSamples": 8
            }, void 0, false, {
                fileName: "[project]/src/components/Scene/Lights.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Scene/Lights.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(Lights, "m8ZZePv5OfZOQT3R/uoTggRx/vU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Helper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHelper"]
    ];
});
_c = Lights;
const SHADOW_CONFIG = {
    enabled: true,
    type: 'PCFSoftShadowMap',
    autoUpdate: false
};
var _c;
__turbopack_context__.k.register(_c, "Lights");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Objects/ObjectLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ObjectLoader",
    ()=>ObjectLoader,
    "preloadModels",
    ()=>preloadModels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/useStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
;
;
// Model path mapping
const MODEL_PATHS = {
    desk: '/Furniture/desk1.glb',
    chair: '/Furniture/chair.glb',
    monitor: '/Furniture/monitor.glb',
    plant: '/Furniture/plant1.glb'
};
// Fallback geometries for failed models
const FALLBACK_GEOMETRIES = {
    desk: {
        type: 'box',
        args: [
            4,
            1.2,
            2
        ],
        color: 0x8B4513
    },
    chair: {
        type: 'box',
        args: [
            1.2,
            2,
            1.2
        ],
        color: 0x654321
    },
    monitor: {
        type: 'box',
        args: [
            2,
            1.5,
            0.2
        ],
        color: 0x2a2a2a
    },
    plant: {
        type: 'sphere',
        args: [
            0.8,
            8,
            6
        ],
        color: 0x4a7c59
    }
};
// Scale configurations
const OBJECT_SCALES = {
    desk: 4,
    chair: 4,
    monitor: 3,
    plant: 3,
    sofa: 5,
    lamp: 2,
    laptop: 1.5
};
// Individual GLTF model component with error boundary
function GLTFModel(param) {
    let { type, position, onLoad } = param;
    _s();
    const modelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const modelPath = MODEL_PATHS[type];
    try {
        const { scene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(modelPath);
        // Clone the scene to allow multiple instances
        const clonedScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
            "GLTFModel.useMemo[clonedScene]": ()=>{
                const clone = scene.clone();
                // Set scale
                const scale = OBJECT_SCALES[type] || 1;
                clone.scale.setScalar(scale);
                // Set position
                clone.position.copy(position);
                // Configure for shadows
                clone.traverse({
                    "GLTFModel.useMemo[clonedScene]": (child)=>{
                        if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            // Clone materials to avoid sharing
                            if (child.material) {
                                child.material = child.material.clone();
                            }
                        }
                    }
                }["GLTFModel.useMemo[clonedScene]"]);
                // Set metadata
                clone.userData = {
                    type,
                    isModel: true,
                    isSurface: [
                        'desk',
                        'chair',
                        'sofa'
                    ].includes(type)
                };
                return clone;
            }
        }["GLTFModel.useMemo[clonedScene]"], [
            scene,
            type,
            position
        ]);
        // Notify parent when loaded
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
            "GLTFModel.useMemo": ()=>{
                if (onLoad && clonedScene) {
                    onLoad(clonedScene);
                }
            }
        }["GLTFModel.useMemo"], [
            clonedScene,
            onLoad
        ]);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
            ref: modelRef,
            object: clonedScene
        }, void 0, false, {
            fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
            lineNumber: 90,
            columnNumber: 12
        }, this);
    } catch (error) {
        console.warn("Failed to load model ".concat(type, ", using fallback"));
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FallbackModel, {
            type: type,
            position: position,
            onLoad: onLoad
        }, void 0, false, {
            fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
            lineNumber: 94,
            columnNumber: 12
        }, this);
    }
}
_s(GLTFModel, "dOYu21pZTlOWXlQXpyo3NUAam4E=");
_c = GLTFModel;
// Fallback component for failed model loads
function FallbackModel(param) {
    let { type, position, onLoad } = param;
    _s1();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fallback = FALLBACK_GEOMETRIES[type] || FALLBACK_GEOMETRIES.desk;
    const mesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FallbackModel.useMemo[mesh]": ()=>{
            let geometry;
            switch(fallback.type){
                case 'sphere':
                    geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](...fallback.args);
                    break;
                default:
                    geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](...fallback.args);
            }
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
                color: fallback.color
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.position.copy(position);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = {
                type,
                isModel: false,
                isSurface: [
                    'desk',
                    'chair',
                    'sofa'
                ].includes(type)
            };
            return mesh;
        }
    }["FallbackModel.useMemo[mesh]"], [
        type,
        position,
        fallback
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FallbackModel.useMemo": ()=>{
            if (onLoad && mesh) {
                onLoad(mesh);
            }
        }
    }["FallbackModel.useMemo"], [
        mesh,
        onLoad
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        ref: meshRef,
        object: mesh
    }, void 0, false, {
        fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
        lineNumber: 136,
        columnNumber: 10
    }, this);
}
_s1(FallbackModel, "nLtJOYDHbikwtVhkX9xIqLl64MI=");
_c1 = FallbackModel;
// Loading placeholder component
function LoadingPlaceholder(param) {
    let { position } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                args: [
                    1,
                    1,
                    1
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                color: 0x888888,
                transparent: true,
                opacity: 0.3
            }, void 0, false, {
                fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_c2 = LoadingPlaceholder;
function ObjectLoader(param) {
    let { type, position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](), id } = param;
    _s2();
    const addObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "ObjectLoader.useStore[addObject]": (state)=>state.addObject
    }["ObjectLoader.useStore[addObject]"]);
    const selectObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "ObjectLoader.useStore[selectObject]": (state)=>state.selectObject
    }["ObjectLoader.useStore[selectObject]"]);
    const surfaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "ObjectLoader.useStore[surfaces]": (state)=>state.surfaces
    }["ObjectLoader.useStore[surfaces]"]);
    const handleObjectLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ObjectLoader.useCallback[handleObjectLoad]": (object)=>{
            const objectData = {
                id: id || "".concat(type, "-").concat(Date.now()),
                object,
                type,
                position: position.clone(),
                scale: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1),
                rotation: 0
            };
            // Add to store
            addObject(objectData);
            // Add to surfaces if applicable
            if (object.userData.isSurface) {
                surfaces.push(object);
            }
            // Auto-select newly added objects
            selectObject(objectData);
        }
    }["ObjectLoader.useCallback[handleObjectLoad]"], [
        type,
        position,
        id,
        addObject,
        selectObject,
        surfaces
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingPlaceholder, {
            position: position
        }, void 0, false, {
            fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
            lineNumber: 184,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GLTFModel, {
            type: type,
            position: position,
            onLoad: handleObjectLoad
        }, void 0, false, {
            fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Objects/ObjectLoader.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
_s2(ObjectLoader, "bEMhmxokwipxYOXNBMnqWVPQp+Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c3 = ObjectLoader;
function preloadModels() {
    Object.values(MODEL_PATHS).forEach((path)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(path);
    });
}
// Cleanup function to dispose of unused models
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].clear = ()=>{
    Object.values(MODEL_PATHS).forEach((path)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].clear(path);
    });
};
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "GLTFModel");
__turbopack_context__.k.register(_c1, "FallbackModel");
__turbopack_context__.k.register(_c2, "LoadingPlaceholder");
__turbopack_context__.k.register(_c3, "ObjectLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Canvas3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Canvas3D",
    ()=>Canvas3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stats$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Stats.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$AdaptiveEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/AdaptiveEvents.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Room$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Scene/Room.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Lights$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Scene/Lights.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Camera$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Scene/Camera.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Objects$2f$ObjectLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Objects/ObjectLoader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/useStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
// Scene content component
function SceneContent() {
    _s();
    const objects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "SceneContent.useStore[objects]": (state)=>state.objects
    }["SceneContent.useStore[objects]"]);
    // Remove performance monitoring hooks for now to reduce overhead
    // const { handleSelect, handleHover } = useObjectSelection()
    // const { setupDragListeners } = useDragAndDrop()
    // const fps = usePerformanceMonitor()
    // const { renderRequested } = useRenderOnDemand()
    // Setup interaction listeners
    // useEffect(() => {
    //   const cleanup = setupDragListeners()
    //   return cleanup
    // }, [setupDragListeners])
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Camera$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Camera"], {}, void 0, false, {
                fileName: "[project]/src/components/Canvas3D.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Lights$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lights"], {
                timeOfDay: "day"
            }, void 0, false, {
                fileName: "[project]/src/components/Canvas3D.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Room$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Room"], {}, void 0, false, {
                fileName: "[project]/src/components/Canvas3D.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            objects.map((obj)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                    object: obj.object,
                    position: obj.position,
                    scale: obj.scale,
                    "rotation-y": obj.rotation
                }, obj.id, false, {
                    fileName: "[project]/src/components/Canvas3D.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)),
            ("TURBOPACK compile-time value", "development") === 'development' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stats$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stats"], {
                showPanel: 0,
                className: "stats"
            }, void 0, false, {
                fileName: "[project]/src/components/Canvas3D.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(SceneContent, "61z+kxF87YrKNs8wxON+Y3eM84A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = SceneContent;
// Loading fallback
function CanvasLoader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[#8b6f47] font-medium",
            children: "Loading 3D Scene..."
        }, void 0, false, {
            fileName: "[project]/src/components/Canvas3D.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Canvas3D.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c1 = CanvasLoader;
function Canvas3D() {
    _s1();
    const renderRequested = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Canvas3D.useStore[renderRequested]": (state)=>state.renderRequested
    }["Canvas3D.useStore[renderRequested]"]);
    // Preload models on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Canvas3D.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Objects$2f$ObjectLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["preloadModels"])();
        }
    }["Canvas3D.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                // Performance optimizations
                dpr: 1,
                frameloop: "demand",
                flat: true,
                legacy: false,
                // Canvas configuration
                camera: false,
                shadows: false,
                // WebGL settings
                gl: {
                    powerPreference: 'high-performance',
                    antialias: false,
                    alpha: false,
                    stencil: false,
                    depth: true,
                    logarithmicDepthBuffer: false,
                    outputColorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"],
                    toneMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"],
                    toneMappingExposure: 0.88,
                    shadowMap: {
                        enabled: true,
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"],
                        autoUpdate: false
                    }
                },
                // Container styling
                className: "outline-none",
                style: {
                    touchAction: 'none',
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$AdaptiveEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdaptiveEvents"], {}, void 0, false, {
                        fileName: "[project]/src/components/Canvas3D.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneContent, {}, void 0, false, {
                            fileName: "[project]/src/components/Canvas3D.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Canvas3D.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                        attach: "fog",
                        args: [
                            0xe8d5c4,
                            25,
                            50
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/Canvas3D.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Canvas3D.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CanvasLoader, {}, void 0, false, {
                    fileName: "[project]/src/components/Canvas3D.tsx",
                    lineNumber: 129,
                    columnNumber: 27
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                        fileName: "[project]/src/components/Canvas3D.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Canvas3D.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Canvas3D.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s1(Canvas3D, "oODZhEPubPNYa9vkkq9Wd7ZXfGY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c2 = Canvas3D;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SceneContent");
__turbopack_context__.k.register(_c1, "CanvasLoader");
__turbopack_context__.k.register(_c2, "Canvas3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Canvas3D.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/Canvas3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_d0ca8ebb._.js.map