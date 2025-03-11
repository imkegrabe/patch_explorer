import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onClick, setGrids, onMouseMove} from './events';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

export function init(element, global_selections) {

    // CAMERA
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 2000);
    const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0, 100 );
    camera.position.set(0, 0, 100);
    

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
    let focused = { 'image': null, 'pixels': null } // currently opened head and its patches
    // let global_selections = [] // stores the data structure: list of layer, heads, x, y coordinates...

    // Add click event
    element.addEventListener("click", onClick(scene, renderer, camera, mouse, raycaster, meshes, focused));
    element.addEventListener("mousemove", onMouseMove(scene, renderer, camera, mouse, raycaster, meshes, focused));

    // adjust to browser drags
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // update renderer size
        renderer.setSize(width, height);

        // update camera aspect ratio and projection matrix
        camera.aspect = width / height;
        camera.left = width / -2;
        camera.right = width / 2;
        camera.top = height / 2;
        camera.bottom = height / -2;
        camera.updateProjectionMatrix();
    });
    
    const nearSlider = document.getElementById("near-slider");
    const farSlider = document.getElementById("far-slider");
    // const range = ref([0, 100]);

    nearSlider.addEventListener("input", () => {
        let nearValueNum = 100 - (Number(nearSlider.value) * 2);

        camera.near = nearValueNum;
        camera.updateProjectionMatrix();
    });

    farSlider.addEventListener("input", () => {
        let farValueNum = 100 - (Number(farSlider.value) * 2);

        camera.far = farValueNum;
        camera.updateProjectionMatrix();
    });

    let texture_loader = new THREE.TextureLoader()

    // Get setGrids handle.
    return setGrids(scene, meshes, focused, global_selections, texture_loader);


}