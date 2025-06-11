import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onClick, setGrids, onMouseMove} from './events';

export let camera1, camera2, cameraActive, timestep_groups, controls1, controls2, controlsActive, renderer, needsRender;

// Utility function to request rendering
export function requestRender() {
    needsRender = true;
}

// Force immediate rendering regardless of animation loop
export function forceRender() {
    if (renderer && cameraActive) {
        const scene = cameraActive.parent;
        if (scene) {
            renderer.render(scene, cameraActive);
        }
    }
}

export function init(element, global_selections) {
    // CAMERA
    const scene = new THREE.Scene();
    camera1 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 2000);
    camera2 = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0, 200 );
    camera1.position.set(0, 0, 153);
    camera2.position.set(0, 0, 153);

    cameraActive = camera2;

    // RENDERER
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1); //background color, opacity
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // Limit pixel ratio for performance
    element.appendChild(renderer.domElement);

    // Use low power mode when not active
    let clock = new THREE.Clock();
    needsRender = true;
    
    function animate() {
        // Throttle rendering when inactive
        const delta = clock.getDelta();
        
        if (needsRender) {
            renderer.render(scene, cameraActive);
            needsRender = false;
        }
        
        // Request another frame
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    animate();
    
    // Force render on interaction
    element.addEventListener('mousemove', () => { needsRender = true; });
    element.addEventListener('click', () => { needsRender = true; });
    element.addEventListener('wheel', () => { needsRender = true; });
    controlsActive = () => { needsRender = true; };

    // CONTROLS
    controls1 = new OrbitControls(camera1, renderer.domElement);
    controls2 = new OrbitControls(camera2, renderer.domElement);
    
    // Common control settings
    const setupControls = (controls) => {
        controls.enableRotate = false;
        controls.enableDamping = true; // Smoother camera movements
        controls.dampingFactor = 0.25;
        
        // Make click and drag pan not rotate
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,         
            MIDDLE: THREE.MOUSE.DOLLY,     
            RIGHT: THREE.MOUSE.ROTATE      
        };
        
        controls.enablePan = true;
        
        // Add change event listener to trigger renders
        controls.addEventListener('change', () => { needsRender = true; });
        
        // Update controls to apply settings
        controls.update();
    };
    
    // Apply settings to both controls
    setupControls(controls1);
    setupControls(controls2);

    //PANNING CONTROLS
    window.addEventListener("keydown", (event) => {
        const panSpeed = 5; // Adjust this value for desired speed
    
        switch (event.key) {
            case "ArrowLeft":
                cameraActive.position.x -= panSpeed;
                if (cameraActive === camera1) {
                    controls1.target.x -= panSpeed;
                } else {
                    controls2.target.x -= panSpeed;
                }
                break;
            case "ArrowRight":
                cameraActive.position.x += panSpeed;
                if (cameraActive === camera1) {
                    controls1.target.x += panSpeed;
                } else {
                    controls2.target.x += panSpeed;
                }
                break;
            case "ArrowUp":
                cameraActive.position.y += panSpeed; // Optional: For vertical movement
                if (cameraActive === camera1) {
                    controls1.target.y += panSpeed;
                } else {
                    controls2.target.y += panSpeed;
                }
                break;
            case "ArrowDown":
                cameraActive.position.y -= panSpeed;
                if (cameraActive === camera1) {
                    controls1.target.y -= panSpeed;
                } else {
                    controls2.target.y -= panSpeed;
                }
                break;
        }
        
        // Trigger a render when using keyboard controls
        needsRender = true;
    });
    
    // State variables
    timestep_groups = [];
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let selection_meshes = [];
    let focused = { 'image': null, 'pixels': null } // currently opened head and its patches

    // Add event listeners
    element.addEventListener("click", onClick(scene, renderer, cameraActive, mouse, raycaster, selection_meshes, focused));
    element.addEventListener("mousemove", onMouseMove(scene, renderer, cameraActive, mouse, raycaster, selection_meshes, focused));

    // Handle window resize
    const resizeHandler = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Update renderer
        renderer.setSize(width, height);

        // Update camera
        if (cameraActive === camera1) {
            camera1.aspect = width / height;
            camera1.updateProjectionMatrix();
        } else {
            camera2.left = width / -2;
            camera2.right = width / 2;
            camera2.top = height / 2;
            camera2.bottom = height / -2;
            camera2.updateProjectionMatrix();
        }
        
        // Force render after resize
        needsRender = true;
    };
    
    window.addEventListener('resize', resizeHandler);

    // Get setGrids handle.
    return setGrids(scene, selection_meshes, timestep_groups, focused, global_selections);
}

export function setCameraActive(cameraType) {
    if (cameraType === '3D') {
        cameraActive = camera1;
        controlsActive = controls1;
    } else if (cameraType === '2D') {
        cameraActive = camera2;
        controlsActive = controls2;
    }
    
    // Force render after camera switch
    renderer.render(renderer.scene, cameraActive);
    controlsActive();
}
