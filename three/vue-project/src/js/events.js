// THis file should have everything to do with handling events from the user.

import * as THREE from 'three';
import { toHandlerKey } from "vue";
import { grid_to_image, destroy, splitImage, updateImage } from "./grids";

// focus specific head image.
export function focus(scene, image, focused){

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
export function defocus(focused){

    updateImage(focused.image, focused.pixels)

    for (let i = 0; i < focused.pixels.children.length; i++){
        destroy(focused.pixels.children[i]);
    }
    focused.pixels.removeFromParent();
    focused.image.visible = true;
    focused.image = null;
    focused.pixels = null;
}

export function setPixel(pixel, value){
    pixel.material.transparent = value;
}


// This function returns a function that should be called when the canvas is clicked
// This is functional programming :)
export function onClick(scene, renderer, camera, mouse, raycaster, meshes, focused){

    function inner(event){
        event.preventDefault();

        // Theres no nice vue "onclick", we need to find out what Meshes you clicked on via raytracing
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

        // If something is currently focused, we need to either click on a pixel to further select it.
        // Otherwise de-select it.
        if (focused.image !== null){
            var intersects = raycaster.intersectObjects( focused.pixels.children, false );

            if (intersects.length > 0){
                // Here is where we would call a function to select pixels.
                if (event.shiftKey){

                    let transparent = event.ctrlKey;

                    for (let i = 0; i < focused.pixels.children.length; i++){
                        let pixel = focused.pixels.children[i]
                        setPixel(pixel, transparent);
                    }
                }
                else{
                    let pixel = intersects[0].object
                    setPixel(pixel, !pixel.material.transparent)
                }
                return
            }

            defocus(focused)
        }

        // Now we want to check if we clicked any image meshes to split up and select.
        var intersects = raycaster.intersectObjects( meshes, false );

        if (intersects.length > 0){
           focus(scene, intersects[0].object, focused);
        }
    }

    return inner

}

export function onMouseMove(scene, renderer, camera, mouse, raycaster, meshes, focused){

    function inner(event){
        event.preventDefault();

        // Theres no nice vue "onclick", we need to find out what Meshes you clicked on via raytracing
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

        // If something is currently focused, we need to either click on a pixel to further select it.
        // Otherwise de-select it.
        if (focused.image !== null && event.shiftKey){
            var intersects = raycaster.intersectObjects( focused.pixels.children, false );

            if (intersects.length > 0){

                let transparent = event.ctrlKey;
            
                let pixel = intersects[0].object
                setPixel(pixel, transparent)

            }
        }

    }

    return inner

}

let padding = 2;

// Function to return the function that should be called when there are new grids from the server
export function setGrids(scene, meshes, focused, global_selections){

    function inner(grids){

        // First destroy any existing meshes. Maybe instead update meshes? That sounds annoying.
        for (let i = 0; i < meshes.length; i++){
            destroy(meshes[i]);
        }

        // Do the same with focused head pixels.
        // console.log(focused.image !== null)
        if (focused.image !== null){
           defocus(focused)
        }

        global_selections.length = 0;

        meshes.length = 0;
        focused.image = null;
        focused.pixels = null;

        // looooop through layers - main array with all layers is called grids and is in 4D - [ layers [ heads [ rows [ cols ]]]]
        let x_offset = 0 //-grids[0][0].length / 2;
        
        for (let layer_idx = 0; layer_idx < grids.length; layer_idx++){

            // group doesnt work yet - do we need it tho?
            // let group = new THREE.Group();
            // group.position.set(layer_idx*layer_offset, 0, 0);
            // scene.add(group);

            let heads = grids[layer_idx];
            let y_offset = -(64*3.5 + padding*3.5) + grids[layer_idx][0].length*3.5 + padding*3.5; //initial offset for grids


            var layer_selections = [];

            //loop through heads which are all the grids at layer x
            for (let head_idx = 0; head_idx < heads.length; head_idx++){
                let grid = heads[head_idx];

                let image = grid_to_image(grid);

                var head_selections = [];
                image.selections = head_selections; //list 
                layer_selections.push(head_selections); //list is global

                image.position.set(x_offset + grid.length/2 -380-20, y_offset+231-20); //moving to the ~center so it looks good with header...

                // console.log("layer", layer_idx, "head", head_idx, image.position)
                // group.add(image);

                scene.add(image);
                y_offset -= grid.length + padding;

                meshes.push(image);

            };

            global_selections.push(layer_selections);
            
            x_offset += grids[layer_idx][0].length + 20;
        }
    }

    return inner
}