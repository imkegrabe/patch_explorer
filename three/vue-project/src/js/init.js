import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onClick, setGrids, onMouseMove} from './events';

export function init(element) {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 2000);
    camera.position.z = 800;
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.setClearColor(0x000000, .75);
    element.appendChild(renderer.domElement);
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

    // Define state vars here
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let meshes = [];
    let selected = { 'image': null, 'pixels': null }

    // Add click event
    element.addEventListener("click", onClick(scene, renderer, camera, mouse, raycaster, meshes, selected));
    element.addEventListener("mousemove", onMouseMove(scene, renderer, camera, mouse, raycaster, meshes, selected));

    // Get setGrids handle.
    return setGrids(scene, meshes, selected);


}