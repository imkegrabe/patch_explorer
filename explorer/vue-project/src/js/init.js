import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onClick, setGrids, onMouseMove} from './events';

export let camera1, camera2, cameraActive;

export function init(element, global_selections) {

    // CAMERA
    const scene = new THREE.Scene();
    camera1 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 2000);
    camera2 = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0, 100 );
    camera1.position.set(0, 0, 150);
    camera2.position.set(0, 0, 150);

    cameraActive = camera1;

    // RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111111, 1); //background color, opacity
    element.appendChild(renderer.domElement);

    function animate() {
        renderer.render(scene, cameraActive);
    }
    renderer.setAnimationLoop(animate);

    // CONTROLS
    const controls1 = new OrbitControls(camera1, renderer.domElement);
    const controls2 = new OrbitControls(camera2, renderer.domElement);
    controls1.enableRotate = false;
    controls2.enableRotate = false;
    // // Make click and drag pan not rotate
    controls1.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,         
        MIDDLE: THREE.MOUSE.DOLLY,     
        RIGHT: THREE.MOUSE.ROTATE      
    };
    controls2.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,         
        MIDDLE: THREE.MOUSE.DOLLY,     
        RIGHT: THREE.MOUSE.ROTATE      
    };
    controls1.enablePan = true;
    controls2.enablePan = true;

    //PANNING CONTROLS
    window.addEventListener("keydown", (event) => {
        const panSpeed = 5; // Adjust this value for desired speed
    
        switch (event.key) {
            case "ArrowLeft":
                cameraActive.position.x -= panSpeed;
                controls.target.x -= panSpeed; // Ensures consistent panning
                break;
            case "ArrowRight":
                cameraActive.position.x += panSpeed;
                controls.target.x += panSpeed;
                break;
            case "ArrowUp":
                cameraActive.position.y += panSpeed; // Optional: For vertical movement
                controls.target.y += panSpeed;
                break;
            case "ArrowDown":
                cameraActive.position.y -= panSpeed;
                controls.target.y -= panSpeed;
                break;
            }
        });
    
        controls1.update();
        controls2.update();
    
    // Define state vars here
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let meshes = [];
    let focused = { 'image': null, 'pixels': null } // currently opened head and its patches
    // let global_selections = [] // stores the data structure: list of layer, heads, x, y coordinates...

    // Add click event
    element.addEventListener("click", onClick(scene, renderer, camera1, mouse, raycaster, meshes, focused));
    element.addEventListener("mousemove", onMouseMove(scene, renderer, camera1, mouse, raycaster, meshes, focused));
    element.addEventListener("click", onClick(scene, renderer, camera2, mouse, raycaster, meshes, focused));
    element.addEventListener("mousemove", onMouseMove(scene, renderer, camera2, mouse, raycaster, meshes, focused));

    // adjust to browser drags
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // update renderer size
        renderer.setSize(width, height);

        // update camera aspect ratio and projection matrix
        camera1.aspect = width / height;
        camera1.left = width / -2;
        camera1.right = width / 2;
        camera1.top = height / 2;
        camera1.bottom = height / -2;
        camera1.updateProjectionMatrix();

        camera2.aspect = width / height;
        camera2.left = width / -2;
        camera2.right = width / 2;
        camera2.top = height / 2;
        camera2.bottom = height / -2;
        camera2.updateProjectionMatrix();
    });

    // Get setGrids handle.
    return setGrids(scene, meshes, focused, global_selections);
}

export function setCameraActive(cameraType) {
    if (cameraType === '3D') {
        cameraActive = camera1; 
        
        // cameraActive.position.set(0, 0, 150);
        // cameraActive.near = 0.01;
        // cameraActive.far = 1000;

    } else if (cameraType === '2D') {
        cameraActive = camera2;  
        
        // cameraActive.position.set(0, 0, 100);
        // cameraActive.near = 0;
        // cameraActive.far = 100;
        
    }
    controls = new OrbitControls(cameraActive, renderer.domElement);
    cameraActive.updateProjectionMatrix();
    controls.object = cameraActive;
    controls.update();
}
