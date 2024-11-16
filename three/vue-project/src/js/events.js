// THis file should have everything to do with handling events from the user.


import { grid_to_image, destroy, splitImage } from "./grids";

// Select specific head image.
export function select(scene, image, selected){

    // Get threejs group of pixels
    let group = splitImage(image);
    // Add them visually
    scene.add(group);
    // Make the original image Mesh invisible
    image.visible = false;

    // Add the image and pixels to the selected object to be used later. How exciting!
    selected.image = image;
    selected.pixels = group;
}

// Deselect a head image Mesh by destroying its expanded pixels and re-showing the image.
export function deselect(selected){

    for (let i = 0; i < selected.pixels.children.length; i++){
        destroy(selected.pixels.children[i]);
    }
    selected.pixels.removeFromParent();
    selected.image.visible = true;
    selected.image = null;
    selected.pixels = null;
}

// This function returns a function that should be called when the canvas is clicked
// This is functional programming :)
export function onClick(scene, renderer, camera, mouse, raycaster, meshes, selected){

    function inner(event){
        event.preventDefault();

        // Theres no nice vue "onclick", we need to find out what Meshes you clicked on via raytracing
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

        // If something is currently selected, we need to either click on a pixel to further select it.
        // Otherwise de-select it.
        if (selected.image !== null){
            var intersects = raycaster.intersectObjects( selected.pixels.children, false );

            if (intersects.length > 0){
                // Here is where we would call a function to select pixels.
                console.log('clicked pixel')
                return
            }

            deselect(selected)
        }

        // Now we want to check if we clicked any image meshes to split up and select.
        var intersects = raycaster.intersectObjects( meshes, false );

        if (intersects.length > 0){
           select(scene, intersects[0].object, selected);
        }
    }

    return inner

}

let padding = .5;

// Function to return the function that should be called when there are new grids from the server
export function setGrids(scene, meshes, selected){

    function inner(grids){

        // First destroy any existing meshes. Maybe instead update meshes? That sounds annoying.
        for (let i = 0; i < meshes.length; i++){
            destroy(meshes[i]);
        }

        // Do they same with selected head pixels.
        if (selected.image !== null){
            for (let i = 0; i < selected.pixels.length; i++){
                destroy(selected.pixels[i]);
            }
        }

        meshes.length = 0;
        selected.image = null;
        selected.pixels = null;

        // Create and add grids. Needs to be changes for 4D inputs and handling placement etc etc
        for (let grid_idx = 0; grid_idx < grids.length; grid_idx++){

            let grid = grids[grid_idx];

            let size = grid.length;

            let image = grid_to_image(grid);
            image.position.set((size + padding) * grid_idx, 0);

            meshes.push(image)

            scene.add(image);

        }
    }

    return inner
}