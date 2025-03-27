// THis file should have everything to do with handling events from the user.

import * as THREE from 'three';
import { toHandlerKey } from "vue";
import { grid_to_image, destroy, splitImage, updateImage } from "./grids";
import { requestRender, forceRender } from "./init";

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
    // Pre-declare variables outside loops for performance
    let layer_x_offset, head_y_offset, posX, posY;
    let image, gridWidth, gridHeight, texture, mesh;
    let size, data;
    
    function inner(grids) {
        const startTime = performance.now();
        
        // Request early render to show something is happening - use direct rendering
        forceRender();
        
        // Use a more efficient scene clearing approach
        function clearScene(scene) {
            // First clean up focused pixels if they exist
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
            
            // Clear timestep groups
            timestep_groups.forEach(group => {
                scene.remove(group);
                group.traverse(obj => {
                    if (obj.geometry) obj.geometry.dispose();
                    if (obj.material) {
                        if (Array.isArray(obj.material)) {
                            obj.material.forEach(mat => {
                                if (mat.map) mat.map.dispose();
                                mat.dispose();
                            });
                        } else {
                            if (obj.material.map) obj.material.map.dispose();
                            obj.material.dispose();
                        }
                    }
                });
            });
            
            // Clear selection meshes
            selection_meshes.forEach(mesh => {
                if (mesh.parent) {
                    mesh.parent.remove(mesh);
                }
                if (mesh.geometry) mesh.geometry.dispose();
                if (mesh.material) {
                    if (mesh.material.map) mesh.material.map.dispose();
                    mesh.material.dispose();
                }
            });
            
            // Also remove any selection group from the scene
            const selectionGroup = scene.children.find(child => 
                child instanceof THREE.Group && child.userData && child.userData.isSelectionGroup);
            if (selectionGroup) {
                scene.remove(selectionGroup);
            }
            
            // Reset arrays
            selection_meshes.length = 0;
            timestep_groups.length = 0;
            global_selections.length = 0;
        }

        clearScene(scene);
        
        // Helper function to unwrap Vue proxies
        const unwrapProxy = proxy => proxy?.__v_raw || proxy;

        // Calculate timesteps and create groups
        const timestepCount = grids[0].length;
        const headPositions = [];
        const headDimensions = [];
        
        // Create all timestep groups at once for better batching
        for (let timestep_idx = 0; timestep_idx < timestepCount; timestep_idx++) {
            const timestepGroup = new THREE.Group();
            timestepGroup.position.set(0, 0, timestep_idx * 3);
            scene.add(timestepGroup);
            timestep_groups.push(timestepGroup);
        }


        // Process each timestep
        for (let timestep_idx = 0; timestep_idx < timestepCount; timestep_idx++) {
            layer_x_offset = 0;
            const timestepGroup = timestep_groups[timestep_idx];

            // Process each layer
            grids.forEach((layer, layer_idx) => {
                const timesteps = layer.map(unwrapProxy).map(item =>
                    Array.isArray(item) ? Array.from(item) : item
                );
                const heads = timesteps[timestep_idx];

                // Calculate initial y offset
                head_y_offset = -(64 * 3.5 + padding * 3.5) +
                    layer[0][0].length * 3.5 + padding * 3.5;

                const layer_selections = [];
                if (timestep_idx === 0) {   
                    global_selections.push(layer_selections);
                }
                
                // Process heads in batch
                heads.forEach((grid, head_idx) => {
                    image = grid_to_image(grid);
                    const head_selections = [];
                    layer_selections.push(head_selections);

                    // Position image
                    posX = layer_x_offset + grid.length / 2 - 380 - 20;
                    posY = head_y_offset + 231 - 20;
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
            
            // Force render update every few timesteps to show progress - use direct rendering
            if (timestep_idx % 5 === 0) {
                forceRender();
            }
        }

        // Create selection overlay
        const selectionGroup = new THREE.Group();
        selectionGroup.position.set(0, 0, timestepCount * 3 + 1);
        selectionGroup.userData = { isSelectionGroup: true }; // Mark for identification
        scene.add(selectionGroup);

        // Pre-create geometries and reuse them
        const geometriesCache = new Map();
        
        // Create selection meshes with optimized batching
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

            // Get cached geometry or create new one
            let geometry = geometriesCache.get(`${gridWidth}x${gridHeight}`);
            if (!geometry) {
                geometry = new THREE.PlaneGeometry(gridWidth, gridHeight);
                geometriesCache.set(`${gridWidth}x${gridHeight}`, geometry);
            }
            
            // Create mesh with the texture
            const mesh = new THREE.Mesh(
                geometry,
                new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,  // Enable transparency
                })
            );

            mesh.selections = headPos.selections;
            mesh.position.set(headPos.x, headPos.y, 0);
            selectionGroup.add(mesh);
            selection_meshes.push(mesh);
        });
        
        const endTime = performance.now();
        console.log(`setGrids inner function took ${endTime - startTime} ms to execute`);
        
        // Dispose geometry cache to prevent memory leaks
        geometriesCache.forEach(geometry => geometry.dispose());
        geometriesCache.clear();

        // Force final rendering after setting grids - use direct rendering
        forceRender();
        
        // Also schedule a regular render to ensure animation loop is updated
        requestRender();
    }

    return inner;
}