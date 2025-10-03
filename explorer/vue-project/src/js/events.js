// THis file should have everything to do with handling events from the user.

import * as THREE from 'three';
import { toHandlerKey } from "vue";
import { destroy, splitImage, updateImage, initialize, load} from "./grids";
import { requestRender, forceRender } from "./init";

export function focus(scene, image, focused) {
    let group = splitImage(image);

    // Hide original image
    image.visible = false;
    focused.image = image;
    focused.pixels = group;

    // Add pixels
    scene.add(group);

    // Create rectangle frame manually
    const bbox = new THREE.Box3().setFromObject(image);
    const min = bbox.min;
    const max = bbox.max;

    const points = [
        new THREE.Vector3(min.x, min.y, image.position.z),
        new THREE.Vector3(max.x, min.y, image.position.z),

        new THREE.Vector3(max.x, min.y, image.position.z),
        new THREE.Vector3(max.x, max.y, image.position.z),

        new THREE.Vector3(max.x, max.y, image.position.z),
        new THREE.Vector3(min.x, max.y, image.position.z),

        new THREE.Vector3(min.x, max.y, image.position.z),
        new THREE.Vector3(min.x, min.y, image.position.z),
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({ 
            color: 0x39ff14, 
            linewidth: 5})
    );

    scene.add(line);
    focused.frame = line;
}

  

// defocus a head image Mesh by destroying its expanded pixels and re-showing the image.
export function defocus(focused, scene) {
    updateImage(focused.image, focused.pixels);
  
    for (let i = 0; i < focused.pixels.children.length; i++) {
        destroy(focused.pixels.children[i]);
    }
    focused.pixels.removeFromParent();

    focused.frame.visible = false;

    focused.image.visible = true;
    focused.image = null;
    focused.pixels = null;
}

  


const alpha = .6;

export function setPixel(pixel, value) {

    if (value) {
        pixel.material.color.g = 1.0;
        pixel.material.opacity = alpha
    }
    else{
        pixel.material.opacity = 0.0;
    }

    pixel.material.needsUpdate = true;
}


// This function returns a function that should be called when the canvas is clicked
// This is functional programming :)
export function onClick(scene, renderer, camera, mouse, raycaster, selection_meshes, focused) {

    function inner(event) {
        event.preventDefault();

        // Theres no nice vue "onclick", we need to find out what Meshes you clicked on via raytracing
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // If something is currently focused, we need to either click on a pixel to further select it.
        // Otherwise de-select it.
        if (focused.image !== null) {
            var intersects = raycaster.intersectObjects(focused.pixels.children, false);

            if (intersects.length > 0) {
                console.log('intersectscfocus', intersects[0].object);
                // Here is where we would call a function to select pixels.
                if (event.shiftKey) {

                    let transparent = !event.ctrlKey;

                    for (let i = 0; i < focused.pixels.children.length; i++) {
                        let pixel = focused.pixels.children[i]
                        setPixel(pixel, transparent);
                    }
                }
                else {
                    let pixel = intersects[0].object
                    // setPixel(pixel, !pixel.material.transparent)
                    setPixel(pixel, pixel.material.opacity === 0.0) // for green
                }
                return
            }

            defocus(focused)
        }

        // Now we want to check if we clicked any image meshes to split up and select.
        var intersects = raycaster.intersectObjects(selection_meshes, false);

        if (intersects.length > 0) {
            console.log('intersects when clicked', intersects[0].object);
            focus(scene, intersects[0].object, focused);
        }
    }

    return inner

}

export function onMouseMove(scene, renderer, camera, mouse, raycaster, selection_meshes, focused) {

    function inner(event) {
        event.preventDefault();

        // Theres no nice vue "onclick", we need to find out what Meshes you clicked on via raytracing
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // If something is currently focused, we need to either click on a pixel to further select it.
        // Otherwise de-select it.
        if (focused.image !== null && event.shiftKey) {
            var intersects = raycaster.intersectObjects(focused.pixels.children, false);

            if (intersects.length > 0) {

                let transparent = !event.ctrlKey;

                let pixel = intersects[0].object
                setPixel(pixel, transparent)

            }
        }

        var intersectsheads = raycaster.intersectObjects(selection_meshes, false);

        // this is just to show the name when hovering over head
        const hoverLabel = document.getElementById("hover-head-label")
        
        if (intersectsheads.length > 0) {
            // console.log('hovering over head', intersectsheads[0].object)

            const hovered = intersectsheads[0].object;
            hoverLabel.textContent = `${hovered.name } Click to edit.`|| "unnamed";
            hoverLabel.style.display = "block";
            hoverLabel.style.left = event.clientX + 10 + "px";
            hoverLabel.style.top = event.clientY + 10 + "px";
        } else {
            hoverLabel.style.display = "none";
        }

    }

    return inner

}

let padding = 2;
// Function to return the function that should be called when there are new grids from the server
export function setGrids(scene, selection_meshes, timestep_meshes, focused, global_selections) {
    let cache = null;
    function inner(grids) {
        // Use cached result if available
        console.time('setGrids-execution');
        
        if (!cache) {
            console.time('initialize-grids');
            cache = initialize(grids);
            console.timeEnd('initialize-grids');

            console.time('add-meshes-to-scene');
            cache[0].forEach(mesh => {
                scene.add(mesh);
                timestep_meshes.push(mesh);
            });

            scene.add(cache[1]);

            cache[1].children.forEach(child => {
                let layer_selections = [];
                for (let i = child.children.length - 1; i >= 0; i--) {
                    let mesh = child.children[i];
                    let head_selections = [];
                    mesh.selections = head_selections;
                    mesh.visible = false;
                    selection_meshes.push(mesh);
                    layer_selections.push(head_selections);
                }
                global_selections.push(layer_selections);
            });
            console.timeEnd('add-meshes-to-scene');
        }
        else {
            console.time('clear-selection-meshes');
            // Clear all selection meshes data
            selection_meshes.forEach(mesh => {
                const data = mesh.material.map.image.data;
                for (let i = 0; i < data.length; i++) {
                    data[i] = 0;
                }
                mesh.visible = false;
                mesh.selections.length = 0;
                mesh.material.map.needsUpdate = true;
            });
            console.timeEnd('clear-selection-meshes');
        }

        console.time('load-grids');
        load(grids, cache[0]);
        console.timeEnd('load-grids');
        
        console.time('cleanup-focused');
        if (focused.image !== null || focused.pixels !== null) {
            // Clean up any expanded pixels
            if (focused.pixels) {
                // Properly dispose of all pixel meshes in the group
                for (let i = 0; i < focused.pixels.children.length; i++) {
                    destroy(focused.pixels.children[i]);
                }
                // Remove from scene
                if (focused.pixels.parent) {
                    focused.pixels.parent.remove(focused.pixels);
                }
            }
            
            // Reset focused object
            focused.image = null;
            focused.pixels = null;
        }
        console.timeEnd('cleanup-focused');

        requestRender();
        console.timeEnd('setGrids-execution');
        
       
    }

    return inner;
}