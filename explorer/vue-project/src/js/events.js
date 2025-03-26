// THis file should have everything to do with handling events from the user.

import * as THREE from 'three';
import { toHandlerKey } from "vue";
import { grid_to_image, destroy, splitImage, updateImage } from "./grids";

// focus specific head image.
export function focus(scene, image, focused) {

    // Get THREE.Group of pixels
    let group = splitImage(image);
    // Add group to scene
    scene.add(group);
    // Make original image-mesh invisible
    image.visible = false;

    // Add the image and pixels to the focused object to be used later. How exciting! lol
    focused.image = image;
    focused.pixels = group;
}

// defocus a head image Mesh by destroying its expanded pixels and re-showing the image.
export function defocus(focused) {

    updateImage(focused.image, focused.pixels)

    for (let i = 0; i < focused.pixels.children.length; i++) {
        destroy(focused.pixels.children[i]);
    }
    focused.pixels.removeFromParent();
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

    }

    return inner

}

let padding = 2;
// Function to return the function that should be called when there are new grids from the server
export function setGrids(scene, selection_meshes, timestep_groups, focused, global_selections) {

    function inner(grids) {
        const startTime = performance.now();
        
        // Clear existing state
        selection_meshes.forEach(mesh => destroy(mesh));
        selection_meshes.length = 0;

        if (focused.image) {
            defocus(focused);
        }
        focused.image = null;
        focused.pixels = null;

        global_selections.length = 0;
        timestep_groups.length = 0;
        // Helper function to unwrap Vue proxies
        const unwrapProxy = proxy => proxy?.__v_raw || proxy;

        // Calculate timesteps and create groups
        const timestepCount = grids[0].length;
        const headPositions = [];
        const headDimensions = [];

        // Process each timestep
        for (let timestep_idx = 0; timestep_idx < timestepCount; timestep_idx++) {
            const timestepGroup = new THREE.Group();
            timestepGroup.position.set(0, 0, timestep_idx * 3);
            scene.add(timestepGroup);
            timestep_groups.push(timestepGroup);

            let layer_x_offset = 0;

            // Process each layer
            grids.forEach((layer, layer_idx) => {
                const timesteps = layer.map(unwrapProxy).map(item =>
                    Array.isArray(item) ? Array.from(item) : item
                );
                const heads = timesteps[timestep_idx];

                // Calculate initial y offset
                let head_y_offset = -(64 * 3.5 + padding * 3.5) +
                    layer[0][0].length * 3.5 + padding * 3.5;

                const layer_selections = [];
                if (timestep_idx === 0) {   
                    global_selections.push(layer_selections);
                }

                // Process each head
                heads.forEach((grid, head_idx) => {
                    const image = grid_to_image(grid);
                    const head_selections = [];
                    layer_selections.push(head_selections);

                    // Position image
                    const posX = layer_x_offset + grid.length / 2 - 380 - 20;
                    const posY = head_y_offset + 231 - 20;
                    image.position.set(posX, posY, 0);

                    // Store position data for first timestep
                    if (timestep_idx === 0) {
                        headPositions.push({
                            layer: layer_idx,
                            head: head_idx,
                            x: posX,
                            y: posY,
                            selections: head_selections
                        });
                        headDimensions.push({
                            width: grid.length,
                            height: grid[0].length
                        });
                    }

                    timestepGroup.add(image);
                    head_y_offset -= grid.length + padding;
                });

                layer_x_offset += layer[0][0].length + 20;
            });
        }

        // Create selection overlay
        const selectionGroup = new THREE.Group();
        selectionGroup.position.set(0, 0, timestepCount * 3 + 1);
        scene.add(selectionGroup);

        // Create selection meshes
        headPositions.forEach((headPos, idx) => {
            const { width: gridWidth, height: gridHeight } = headDimensions[idx];

            // Create a data texture with one pixel per grid cell with RGBA format
            const size = gridWidth * gridHeight;
            const data = new Uint8Array(4 * size); // RGBA values (4 bytes per pixel)
            // Create the data texture with RGBA format
            const texture = new THREE.DataTexture(
                data,
                gridWidth,
                gridHeight,
                THREE.RGBAFormat // Use RGBA instead of RGB
            );
            texture.needsUpdate = true;

            // Create mesh with the texture
            const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(gridWidth, gridHeight),
                new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,  // Enable transparency
                })
            );

            mesh.selections = headPos.selections;

            mesh.selections.push(1,2,3);

            mesh.position.set(headPos.x, headPos.y, 0);
            selectionGroup.add(mesh);
            selection_meshes.push(mesh);
        });

        console.log("global_selections:", global_selections)
        
        const endTime = performance.now();
        console.log(`setGrids inner function took ${endTime - startTime} ms to execute`);
    }

    return inner;
}