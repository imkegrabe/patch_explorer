import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onClick, setGrids, onMouseMove} from './events';

export function init(element) {

    // CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 2000);
    // const camera = new THREE.OrthogonalCamera(-2000, 2000, 1000, -1000, 0.01, 2000)
    camera.position.set(0, 0, 500);

    // RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111111, 1); //background color, opacity
    element.appendChild(renderer.domElement);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    // Make click and drag pan not rotate
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,         
        MIDDLE: THREE.MOUSE.DOLLY,     
        RIGHT: THREE.MOUSE.ROTATE      
    };
    controls.update();

    function animate() {
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    // Define state vars here
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let meshes = [];
    let selected = { 'image': null, 'pixels': null }
    let global_selections = []

    // Add click event
    element.addEventListener("click", onClick(scene, renderer, camera, mouse, raycaster, meshes, selected));
    element.addEventListener("mousemove", onMouseMove(scene, renderer, camera, mouse, raycaster, meshes, selected));

    // adjust to browser drags
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // update renderer size
        renderer.setSize(width, height);

        // update camera aspect ratio and projection matrix
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    
    // Get setGrids handle.
    return setGrids(scene, meshes, selected, global_selections);


}