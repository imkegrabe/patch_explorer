import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onClick, setGrids, onMouseMove} from './events';

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
    controls.enablePan = true;
    controls.update();

    function animate() {
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    //PANNING CONTROLS
    window.addEventListener("keydown", (event) => {
        const panSpeed = 5; // Adjust this value for desired speed
    
        switch (event.key) {
            case "ArrowLeft":
                camera.position.x -= panSpeed;
                controls.target.x -= panSpeed; // Ensures consistent panning
                break;
            case "ArrowRight":
                camera.position.x += panSpeed;
                controls.target.x += panSpeed;
                break;
            case "ArrowUp":
                camera.position.y += panSpeed; // Optional: For vertical movement
                controls.target.y += panSpeed;
                break;
            case "ArrowDown":
                camera.position.y -= panSpeed;
                controls.target.y -= panSpeed;
                break;
        }
    
        controls.update(); // Ensure camera updates properly
    });
    

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

    const nearValue = document.getElementById("near-value");
    const farValue = document.getElementById("far-value");

    // const range = ref([0, 100]);

    nearSlider.addEventListener("input", () => {
        let nearValueNum = Number(nearSlider.value);

        camera.near = nearValueNum;
        camera.updateProjectionMatrix();
        nearValue.textContent = 50 - nearValueNum/2;
    });

    farSlider.addEventListener("input", () => {
        let farValueNum = Number(farSlider.value);

        camera.far = farValueNum;
        camera.updateProjectionMatrix();
        farValue.textContent = 50 - farValueNum/2;
    });

    // Get setGrids handle.
    return setGrids(scene, meshes, focused, global_selections);


}