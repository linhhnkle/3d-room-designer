(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/stores/useStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
;
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
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
        cameraPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](12, 8, 12),
        cameraRotation: 0,
        renderRequested: false,
        frameRate: 60,
        // Actions
        addObject: (object)=>set((state)=>({
                    objects: [
                        ...state.objects,
                        object
                    ],
                    renderRequested: true
                })),
        removeObject: (id)=>set((state)=>{
                var _state_selectedObject;
                return {
                    objects: state.objects.filter((obj)=>obj.id !== id),
                    selectedObject: ((_state_selectedObject = state.selectedObject) === null || _state_selectedObject === void 0 ? void 0 : _state_selectedObject.id) === id ? null : state.selectedObject,
                    renderRequested: true
                };
            }),
        selectObject: (object)=>set(()=>({
                    selectedObject: object,
                    renderRequested: true
                })),
        updateObject: (id, updates)=>set((state)=>({
                    objects: state.objects.map((obj)=>obj.id === id ? {
                            ...obj,
                            ...updates
                        } : obj),
                    renderRequested: true
                })),
        // UI actions
        toggleColorPanel: ()=>set((state)=>({
                    isColorPanelOpen: !state.isColorPanelOpen,
                    isTexturePanelOpen: false,
                    isFurnitureMenuOpen: false
                })),
        toggleTexturePanel: ()=>set((state)=>({
                    isTexturePanelOpen: !state.isTexturePanelOpen,
                    isColorPanelOpen: false,
                    isFurnitureMenuOpen: false
                })),
        toggleFurnitureMenu: ()=>set((state)=>({
                    isFurnitureMenuOpen: !state.isFurnitureMenuOpen,
                    isColorPanelOpen: false,
                    isTexturePanelOpen: false
                })),
        toggleObjectColorPanel: ()=>set((state)=>({
                    isObjectColorPanelOpen: !state.isObjectColorPanelOpen
                })),
        setCurrentSection: (section)=>set(()=>({
                    currentSection: section
                })),
        // Performance actions
        requestRender: ()=>set(()=>({
                    renderRequested: true
                })),
        setFrameRate: (fps)=>set(()=>({
                    frameRate: fps
                }))
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Scene/Camera.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Camera",
    ()=>Camera,
    "useCameraControls",
    ()=>useCameraControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/useStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
function Camera(param) {
    let { position = [
        12,
        8,
        12
    ], target = [
        0,
        2,
        0
    ] } = param;
    _s();
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { size, set } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const cameraPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Camera.useStore[cameraPosition]": (state)=>state.cameraPosition
    }["Camera.useStore[cameraPosition]"]);
    const cameraRotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Camera.useStore[cameraRotation]": (state)=>state.cameraRotation
    }["Camera.useStore[cameraRotation]"]);
    const requestRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Camera.useStore[requestRender]": (state)=>state.requestRender
    }["Camera.useStore[requestRender]"]);
    // Update orthographic camera bounds on resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Camera.useEffect": ()=>{
            if (cameraRef.current) {
                const aspect = size.width / size.height;
                const frustumSize = 16;
                cameraRef.current.left = -frustumSize * aspect / 2;
                cameraRef.current.right = frustumSize * aspect / 2;
                cameraRef.current.top = frustumSize / 2;
                cameraRef.current.bottom = -frustumSize / 2;
                cameraRef.current.updateProjectionMatrix();
                requestRender();
            }
        }
    }["Camera.useEffect"], [
        size
    ]);
    // Set camera position and target - run once on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Camera.useEffect": ()=>{
            if (cameraRef.current) {
                cameraRef.current.position.set(...position);
                cameraRef.current.lookAt(...target);
                cameraRef.current.updateProjectionMatrix();
                requestRender();
            }
        }
    }["Camera.useEffect"], []); // Empty dependencies - only run once
    // Smooth camera rotation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Camera.useFrame": ()=>{
            if (cameraRef.current && cameraRotation !== 0) {
                const radius = 14;
                const x = Math.cos(cameraRotation) * radius;
                const z = Math.sin(cameraRotation) * radius;
                cameraRef.current.position.set(x, 8, z);
                cameraRef.current.lookAt(0, 2, 0);
                cameraRef.current.updateProjectionMatrix();
                requestRender();
            }
        }
    }["Camera.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("orthographicCamera", {
        ref: cameraRef,
        makeDefault: true,
        position: position,
        near: 0.1,
        far: 100,
        zoom: 1
    }, void 0, false, {
        fileName: "[project]/src/components/Scene/Camera.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(Camera, "Grxna7EkSGc914POyxWrXPiSZ8s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Camera;
function useCameraControls() {
    _s1();
    const cameraRotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "useCameraControls.useStore[cameraRotation]": (state)=>state.cameraRotation
    }["useCameraControls.useStore[cameraRotation]"]);
    const rotateLeft = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].setState((state)=>({
                cameraRotation: state.cameraRotation + Math.PI / 4
            }));
    };
    const rotateRight = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].setState((state)=>({
                cameraRotation: state.cameraRotation - Math.PI / 4
            }));
    };
    const resetCamera = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].setState({
            cameraRotation: 0,
            cameraPosition: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](12, 8, 12)
        });
    };
    return {
        rotateLeft,
        rotateRight,
        resetCamera,
        currentRotation: cameraRotation
    };
}
_s1(useCameraControls, "4AsKiQOaGsZDcwviNeDjshAwfFY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
var _c;
__turbopack_context__.k.register(_c, "Camera");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UI/Controls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Controls",
    ()=>Controls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Camera$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Scene/Camera.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/useStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Controls() {
    _s();
    const { rotateLeft } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Camera$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCameraControls"])();
    const toggleColorPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Controls.useStore[toggleColorPanel]": (state)=>state.toggleColorPanel
    }["Controls.useStore[toggleColorPanel]"]);
    const toggleTexturePanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Controls.useStore[toggleTexturePanel]": (state)=>state.toggleTexturePanel
    }["Controls.useStore[toggleTexturePanel]"]);
    const toggleFurnitureMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Controls.useStore[toggleFurnitureMenu]": (state)=>state.toggleFurnitureMenu
    }["Controls.useStore[toggleFurnitureMenu]"]);
    // Reset scene function
    const resetScene = ()=>{
        // Clear all objects except room
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].setState((state)=>({
                objects: [],
                selectedObject: null,
                hoveredObject: null,
                renderRequested: true
            }));
    };
    // Toggle time of day (placeholder)
    const toggleTimeOfDay = ()=>{
    // Implementation will be added
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                    onClick: rotateLeft,
                    title: "Rotate Left",
                    icon: "↶"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Controls.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                    onClick: toggleColorPanel,
                    title: "Change Colors",
                    icon: "🎨"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Controls.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                    onClick: toggleTexturePanel,
                    title: "Change Textures",
                    icon: "🪵"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Controls.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                    onClick: toggleFurnitureMenu,
                    title: "Add Furniture",
                    icon: "🛋️"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Controls.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                    onClick: toggleTimeOfDay,
                    title: "Time of Day",
                    icon: "☀️"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Controls.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                    onClick: resetScene,
                    title: "Reset Scene",
                    icon: "🔄"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Controls.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/UI/Controls.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/UI/Controls.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(Controls, "tLzxY69/kKiZbwP62zf2ATE92Ds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Scene$2f$Camera$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCameraControls"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = Controls;
function ControlButton(param) {
    let { onClick, title, icon, disabled = false } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        title: title,
        className: "\n        w-11 h-11 flex items-center justify-center\n        bg-[#f5e6d3]/80 text-[#8b6f47] text-xl\n        rounded-lg transition-all duration-200\n        hover:bg-[#f5e6d3] hover:shadow-md hover:scale-105\n        active:bg-[#f5e6d3]/90 active:scale-95\n        disabled:opacity-50 disabled:cursor-not-allowed\n        disabled:hover:scale-100 disabled:hover:shadow-none\n      ",
        children: icon
    }, void 0, false, {
        fileName: "[project]/src/components/UI/Controls.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c1 = ControlButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "Controls");
__turbopack_context__.k.register(_c1, "ControlButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UI/Toolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toolbar",
    ()=>Toolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/useStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Toolbar() {
    _s();
    const selectedObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Toolbar.useStore[selectedObject]": (state)=>state.selectedObject
    }["Toolbar.useStore[selectedObject]"]);
    const updateObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Toolbar.useStore[updateObject]": (state)=>state.updateObject
    }["Toolbar.useStore[updateObject]"]);
    const removeObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Toolbar.useStore[removeObject]": (state)=>state.removeObject
    }["Toolbar.useStore[removeObject]"]);
    const toggleObjectColorPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "Toolbar.useStore[toggleObjectColorPanel]": (state)=>state.toggleObjectColorPanel
    }["Toolbar.useStore[toggleObjectColorPanel]"]);
    if (!selectedObject) {
        return null;
    }
    // Toolbar actions
    const scaleUp = ()=>{
        const currentScale = selectedObject.scale.x;
        const newScale = Math.min(currentScale * 1.1, 8);
        const newScaleVector = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](newScale, newScale, newScale);
        updateObject(selectedObject.id, {
            scale: newScaleVector
        });
    };
    const scaleDown = ()=>{
        const currentScale = selectedObject.scale.x;
        const newScale = Math.max(currentScale * 0.9, 0.2);
        const newScaleVector = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](newScale, newScale, newScale);
        updateObject(selectedObject.id, {
            scale: newScaleVector
        });
    };
    const rotateObject = ()=>{
        const newRotation = selectedObject.rotation + Math.PI / 4;
        updateObject(selectedObject.id, {
            rotation: newRotation
        });
    };
    const duplicateObject = ()=>{
        // Create duplicate with slight offset
        const newPosition = selectedObject.position.clone();
        newPosition.x += 2;
        const duplicateData = {
            ...selectedObject,
            id: "".concat(selectedObject.type, "-").concat(Date.now()),
            position: newPosition
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().addObject(duplicateData);
    };
    const deleteObject = ()=>{
        removeObject(selectedObject.id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-20 right-5 z-20 transition-all duration-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-1 bg-white/95 backdrop-blur-md p-1 rounded-lg shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                    onClick: scaleDown,
                    title: "Scale Down",
                    icon: "➖"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Toolbar.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                    onClick: scaleUp,
                    title: "Scale Up",
                    icon: "➕"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Toolbar.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                    onClick: duplicateObject,
                    title: "Duplicate",
                    icon: "📋"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Toolbar.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                    onClick: toggleObjectColorPanel,
                    title: "Change Colors",
                    icon: "🎨"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Toolbar.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                    onClick: rotateObject,
                    title: "Rotate 45°",
                    icon: "🔄"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Toolbar.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolbarButton, {
                    onClick: deleteObject,
                    title: "Delete",
                    icon: "🗑️",
                    variant: "danger"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/Toolbar.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/UI/Toolbar.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/UI/Toolbar.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(Toolbar, "bRGCRIgMhTh/xalHRKs9OM7k12g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = Toolbar;
function ToolbarButton(param) {
    let { onClick, title, icon, variant = 'default' } = param;
    const baseClasses = "\n    w-8 h-8 flex items-center justify-center text-sm\n    rounded-md transition-all duration-150\n    hover:scale-105 active:scale-95\n  ";
    const variantClasses = variant === 'danger' ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-[#f5e6d3]/80 text-[#8b6f47] hover:bg-[#f5e6d3]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        title: title,
        className: "".concat(baseClasses, " ").concat(variantClasses),
        children: icon
    }, void 0, false, {
        fileName: "[project]/src/components/UI/Toolbar.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_c1 = ToolbarButton;
var _c, _c1;
__turbopack_context__.k.register(_c, "Toolbar");
__turbopack_context__.k.register(_c1, "ToolbarButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UI/FurnitureMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FurnitureMenu",
    ()=>FurnitureMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/useStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Furniture categories and items
const FURNITURE_CATEGORIES = {
    main: {
        title: 'Categories',
        items: [
            {
                id: 'desks',
                name: 'Desks',
                icon: '🪑',
                emoji: '🪑'
            },
            {
                id: 'chairs',
                name: 'Chairs',
                icon: '🪑',
                emoji: '🪑'
            },
            {
                id: 'plants',
                name: 'Plants',
                icon: '🌿',
                emoji: '🌿'
            },
            {
                id: 'electronics',
                name: 'Electronics',
                icon: '💻',
                emoji: '💻'
            }
        ]
    },
    desks: {
        title: 'Desks',
        items: [
            {
                id: 'desk',
                name: 'Office Desk',
                type: 'desk',
                thumbnail: '/Thumbnails/desk1.png'
            },
            {
                id: 'desk2',
                name: 'Modern Desk',
                type: 'desk',
                thumbnail: '/Thumbnails/desk2.png'
            },
            {
                id: 'desk3',
                name: 'Corner Desk',
                type: 'desk',
                thumbnail: '/Thumbnails/desk3.png'
            }
        ]
    },
    chairs: {
        title: 'Chairs',
        items: [
            {
                id: 'chair',
                name: 'Office Chair',
                type: 'chair',
                thumbnail: '/Thumbnails/chair.png'
            },
            {
                id: 'chair2',
                name: 'Ergonomic Chair',
                type: 'chair',
                thumbnail: '/Thumbnails/chair2.png'
            }
        ]
    },
    plants: {
        title: 'Plants',
        items: [
            {
                id: 'plant',
                name: 'Plant',
                type: 'plant',
                thumbnail: '/Thumbnails/plant1.png'
            },
            {
                id: 'plant2',
                name: 'Succulent',
                type: 'plant',
                thumbnail: '/Thumbnails/plant2.png'
            },
            {
                id: 'plant3',
                name: 'Palm Tree',
                type: 'plant',
                thumbnail: '/Thumbnails/plant3.png'
            }
        ]
    },
    electronics: {
        title: 'Electronics',
        items: [
            {
                id: 'monitor',
                name: 'Monitor',
                type: 'monitor',
                thumbnail: '/Thumbnails/monitor.png'
            },
            {
                id: 'laptop',
                name: 'Laptop',
                type: 'laptop',
                thumbnail: '/Thumbnails/laptop.png'
            }
        ]
    }
};
function FurnitureMenu() {
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isAddingObject, setIsAddingObject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isFurnitureMenuOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "FurnitureMenu.useStore[isFurnitureMenuOpen]": (state)=>state.isFurnitureMenuOpen
    }["FurnitureMenu.useStore[isFurnitureMenuOpen]"]);
    const currentSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "FurnitureMenu.useStore[currentSection]": (state)=>state.currentSection
    }["FurnitureMenu.useStore[currentSection]"]);
    const setCurrentSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "FurnitureMenu.useStore[setCurrentSection]": (state)=>state.setCurrentSection
    }["FurnitureMenu.useStore[setCurrentSection]"]);
    const toggleFurnitureMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "FurnitureMenu.useStore[toggleFurnitureMenu]": (state)=>state.toggleFurnitureMenu
    }["FurnitureMenu.useStore[toggleFurnitureMenu]"]);
    const addObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "FurnitureMenu.useStore[addObject]": (state)=>state.addObject
    }["FurnitureMenu.useStore[addObject]"]);
    // Filter items based on search
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FurnitureMenu.useMemo[filteredItems]": ()=>{
            var _FURNITURE_CATEGORIES_currentSection;
            if (!searchTerm || currentSection === 'main') {
                var _FURNITURE_CATEGORIES_currentSection1;
                return ((_FURNITURE_CATEGORIES_currentSection1 = FURNITURE_CATEGORIES[currentSection]) === null || _FURNITURE_CATEGORIES_currentSection1 === void 0 ? void 0 : _FURNITURE_CATEGORIES_currentSection1.items) || [];
            }
            const items = ((_FURNITURE_CATEGORIES_currentSection = FURNITURE_CATEGORIES[currentSection]) === null || _FURNITURE_CATEGORIES_currentSection === void 0 ? void 0 : _FURNITURE_CATEGORIES_currentSection.items) || [];
            return items.filter({
                "FurnitureMenu.useMemo[filteredItems]": (item)=>{
                    var _item_type;
                    return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || ((_item_type = item.type) === null || _item_type === void 0 ? void 0 : _item_type.toLowerCase().includes(searchTerm.toLowerCase()));
                }
            }["FurnitureMenu.useMemo[filteredItems]"]);
        }
    }["FurnitureMenu.useMemo[filteredItems]"], [
        searchTerm,
        currentSection
    ]);
    // Get spawn position for new objects
    const getSpawnPosition = (type)=>{
        const smallItems = [
            'monitor',
            'laptop',
            'plant'
        ];
        // Small items spawn on surfaces if available
        if (smallItems.includes(type)) {
            // For now, spawn at origin - surface detection will be added later
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
        }
        // Large items spawn on floor
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.random() * 6 - 3, 0, Math.random() * 6 - 3 // Random Z between -3 and 3
        );
    };
    // Handle object addition
    const handleAddObject = async (type)=>{
        if (isAddingObject) return;
        setIsAddingObject(true);
        try {
            const position = getSpawnPosition(type);
            // Add object through ObjectLoader component
            const objectData = {
                id: "".concat(type, "-").concat(Date.now()),
                object: null,
                type,
                position,
                scale: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1),
                rotation: 0
            };
        // The ObjectLoader component will handle the actual object creation
        // For now, we'll trigger the object creation directly
        // This will be replaced with a more elegant solution
        } catch (error) {
            console.error('Error adding object:', error);
        } finally{
            setIsAddingObject(false);
            toggleFurnitureMenu(); // Close menu after adding
        }
    };
    // Handle navigation
    const navigateToSection = (sectionId)=>{
        setCurrentSection(sectionId);
        setSearchTerm('');
    };
    const navigateBack = ()=>{
        setCurrentSection('main');
        setSearchTerm('');
    };
    if (!isFurnitureMenuOpen) return null;
    const currentCategory = FURNITURE_CATEGORIES[currentSection];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-96 max-h-[80vh] overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-4 border-b border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                currentSection !== 'main' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: navigateBack,
                                    className: "p-1 text-[#8b6f47] hover:bg-[#f5e6d3] rounded-lg transition-colors",
                                    children: "←"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-[#8b6f47]",
                                    children: (currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.title) || 'Furniture'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleFurnitureMenu,
                            className: "p-1 text-[#8b6f47] hover:bg-[#f5e6d3] rounded-lg transition-colors",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this),
                currentSection !== 'main' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-b border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search furniture...",
                        value: searchTerm,
                        onChange: (e)=>setSearchTerm(e.target.value),
                        className: "w-full px-3 py-2 bg-[#f5e6d3]/30 border border-[#e8d5c4] rounded-lg text-[#8b6f47] placeholder-[#8b6f47]/60 focus:outline-none focus:ring-2 focus:ring-[#8b6f47]/30"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                        lineNumber: 167,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                    lineNumber: 166,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 max-h-96 overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: filteredItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: currentSection === 'main' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryButton, {
                                        item: item,
                                        onClick: ()=>navigateToSection(item.id)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                                        lineNumber: 183,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FurnitureButton, {
                                        item: item,
                                        onClick: ()=>handleAddObject(item.type),
                                        disabled: isAddingObject
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                                        lineNumber: 188,
                                        columnNumber: 19
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        filteredItems.length === 0 && searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-[#8b6f47]/60",
                            children: [
                                'No items found matching "',
                                searchTerm,
                                '"'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
            lineNumber: 140,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_s(FurnitureMenu, "3J8D4AFiWwMKAzCzg2Vo+13ld4c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = FurnitureMenu;
// Category button for main menu
function CategoryButton(param) {
    let { item, onClick } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: "w-full p-4 bg-[#f5e6d3]/30 hover:bg-[#f5e6d3]/50 rounded-xl transition-colors group",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-2xl group-hover:scale-110 transition-transform",
                    children: item.emoji
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm font-medium text-[#8b6f47]",
                    children: item.name
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
            lineNumber: 216,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
_c1 = CategoryButton;
// Furniture item button
function FurnitureButton(param) {
    let { item, onClick, disabled } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: "w-full p-3 bg-[#f5e6d3]/30 hover:bg-[#f5e6d3]/50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-2",
            children: [
                item.thumbnail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 bg-[#e8d5c4] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: item.thumbnail,
                            alt: item.name,
                            className: "w-8 h-8 object-contain",
                            onError: (e)=>{
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.textContent = '📦';
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden text-xl",
                            children: "📦"
                        }, void 0, false, {
                            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                    lineNumber: 246,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 bg-[#e8d5c4] rounded-lg flex items-center justify-center text-xl group-hover:scale-105 transition-transform",
                    children: "📦"
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                    lineNumber: 259,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-medium text-[#8b6f47] text-center",
                    children: item.name
                }, void 0, false, {
                    fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
                    lineNumber: 263,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
            lineNumber: 244,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/UI/FurnitureMenu.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_c2 = FurnitureButton;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FurnitureMenu");
__turbopack_context__.k.register(_c1, "CategoryButton");
__turbopack_context__.k.register(_c2, "FurnitureButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UI/PerformanceMonitor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PerformanceMonitor",
    ()=>PerformanceMonitor,
    "usePerformanceOptimizations",
    ()=>usePerformanceOptimizations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/useStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
function PerformanceMonitor() {
    _s();
    const [performanceData, setPerformanceData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fps: 0,
        objectCount: 0,
        memoryUsage: null,
        renderTime: 0,
        lastFrameTime: 0
    });
    const objects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "PerformanceMonitor.useStore[objects]": (state)=>state.objects
    }["PerformanceMonitor.useStore[objects]"]);
    const frameRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "PerformanceMonitor.useStore[frameRate]": (state)=>state.frameRate
    }["PerformanceMonitor.useStore[frameRate]"]);
    // Monitor performance metrics
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceMonitor.useEffect": ()=>{
            let frameCount = 0;
            let lastTime = performance.now();
            let animationFrame;
            const updateMetrics = {
                "PerformanceMonitor.useEffect.updateMetrics": ()=>{
                    const now = performance.now();
                    frameCount++;
                    // Update every second
                    if (now - lastTime >= 1000) {
                        const currentFPS = Math.round(frameCount * 1000 / (now - lastTime));
                        // Get memory usage if available
                        let memory = null;
                        if ('memory' in performance) {
                            const memInfo = performance.memory;
                            memory = {
                                used: Math.round(memInfo.usedJSHeapSize / 1048576),
                                total: Math.round(memInfo.totalJSHeapSize / 1048576),
                                limit: Math.round(memInfo.jsHeapSizeLimit / 1048576) // MB
                            };
                        }
                        setPerformanceData({
                            "PerformanceMonitor.useEffect.updateMetrics": (prev)=>({
                                    ...prev,
                                    fps: currentFPS,
                                    objectCount: objects.length,
                                    memoryUsage: memory,
                                    lastFrameTime: now - lastTime
                                })
                        }["PerformanceMonitor.useEffect.updateMetrics"]);
                        frameCount = 0;
                        lastTime = now;
                    }
                    animationFrame = requestAnimationFrame(updateMetrics);
                }
            }["PerformanceMonitor.useEffect.updateMetrics"];
            updateMetrics();
            return ({
                "PerformanceMonitor.useEffect": ()=>{
                    if (animationFrame) {
                        cancelAnimationFrame(animationFrame);
                    }
                }
            })["PerformanceMonitor.useEffect"];
        }
    }["PerformanceMonitor.useEffect"], [
        objects.length
    ]);
    // Performance warnings
    const getPerformanceStatus = ()=>{
        if (performanceData.fps < 30) return 'poor';
        if (performanceData.fps < 45) return 'fair';
        if (performanceData.fps < 55) return 'good';
        return 'excellent';
    };
    const status = getPerformanceStatus();
    const statusColors = {
        poor: 'text-red-400',
        fair: 'text-yellow-400',
        good: 'text-blue-400',
        excellent: 'text-green-400'
    };
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-black/90 text-white text-xs p-3 rounded-lg font-mono space-y-1 min-w-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "FPS:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: statusColors[status],
                        children: performanceData.fps
                    }, void 0, false, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Objects:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: performanceData.objectCount
                    }, void 0, false, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            performanceData.memoryUsage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Memory:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    performanceData.memoryUsage.used,
                                    "MB"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Limit:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    performanceData.memoryUsage.limit,
                                    "MB"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Frame:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            performanceData.lastFrameTime.toFixed(1),
                            "ms"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 bg-gray-700 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full transition-all duration-200 ".concat(status === 'excellent' ? 'bg-green-400' : status === 'good' ? 'bg-blue-400' : status === 'fair' ? 'bg-yellow-400' : 'bg-red-400'),
                            style: {
                                width: "".concat(Math.min(performanceData.fps / 60 * 100, 100), "%")
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-1 text-gray-400 text-[10px]",
                        children: status.toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            status === 'poor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 p-1 bg-red-900/50 rounded text-[10px]",
                children: [
                    "⚠️ Low FPS detected",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this),
                    "Try reducing objects"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
                lineNumber: 151,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/UI/PerformanceMonitor.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(PerformanceMonitor, "8A1Zw0zAFxgOr4hhsKmC60GoCCU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = PerformanceMonitor;
function usePerformanceOptimizations() {
    _s1();
    const objects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "usePerformanceOptimizations.useStore[objects]": (state)=>state.objects
    }["usePerformanceOptimizations.useStore[objects]"]);
    const frameRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "usePerformanceOptimizations.useStore[frameRate]": (state)=>state.frameRate
    }["usePerformanceOptimizations.useStore[frameRate]"]);
    const suggestions = [];
    if (frameRate < 30) {
        suggestions.push('Consider reducing the number of objects in the scene');
        suggestions.push('Enable LOD (Level of Detail) for distant objects');
        suggestions.push('Reduce shadow quality or disable shadows');
    }
    if (objects.length > 50) {
        suggestions.push('Large number of objects detected - consider object pooling');
    }
    if ('memory' in performance) {
        const memInfo = performance.memory;
        const usedMB = memInfo.usedJSHeapSize / 1048576;
        if (usedMB > 100) {
            suggestions.push('High memory usage detected - check for memory leaks');
        }
    }
    return {
        suggestions,
        frameRate,
        objectCount: objects.length
    };
}
_s1(usePerformanceOptimizations, "K4BZydUWmvbKGogbSLZvDxRRkc0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$useStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
var _c;
__turbopack_context__.k.register(_c, "PerformanceMonitor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UI$2f$Controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UI/Controls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UI$2f$Toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UI/Toolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UI$2f$FurnitureMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UI/FurnitureMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UI$2f$PerformanceMonitor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UI/PerformanceMonitor.tsx [app-client] (ecmascript)");
;
'use client';
;
;
;
;
;
;
;
// Dynamically import components that use browser APIs
const DynamicCanvas3D = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/Canvas3D.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>({
            default: mod.Canvas3D
        })), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/Canvas3D.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[#8b6f47] font-medium",
                children: "Loading 3D Room Designer..."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 15,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
});
_c = DynamicCanvas3D;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-5 left-5 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[#8b6f47]",
                        children: "Click to select • Drag to move • Use toolbar to edit objects"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            ("TURBOPACK compile-time value", "development") === 'development' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-5 right-5 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UI$2f$PerformanceMonitor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerformanceMonitor"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingScreen, {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 41,
                    columnNumber: 27
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DynamicCanvas3D, {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UI$2f$Controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UI$2f$Toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toolbar"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UI$2f$FurnitureMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FurnitureMenu"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c1 = Home;
// Loading screen component
function LoadingScreen() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-2xl mb-4",
                    children: "🏠"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[#8b6f47] font-medium mb-2",
                    children: "Loading Room Designer"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-32 h-1 bg-[#e8d5c4] rounded-full overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full bg-[#8b6f47] rounded-full animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c2 = LoadingScreen;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "DynamicCanvas3D");
__turbopack_context__.k.register(_c1, "Home");
__turbopack_context__.k.register(_c2, "LoadingScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_f7a0f0d8._.js.map