// This file should handle operations on grids but not change the scene itself.

import * as THREE from 'three';

let alpha = 255;

export function getColor(value) {
    const cmapCool = (x) => {
        const r = Math.floor(255 * x);
        const g = Math.floor(255 * (1 - x));
        const b = 255;
        return [r, g, b, alpha]
    };

    const cmapCool2 = (x) => {
        const r = x !== 0 ? 255 : 0; // absolute values now...
        // const g = x < 0 ? 255 : 0;
        const g = 0;
        const b = 255;
        const alpha = Math.abs(255 * x * 2 ); //*2
        return [r, g, b, alpha]
    };

    const cmapCool3 = (x) => {
        const r = x > 0 ? 255 : 0;
        const g = x < 0 ? 255 : 0;
        // const g = 0;
        const b = 255;
        const alpha = Math.abs(x); //*2
        return [r, g, b, alpha]
    };

    return cmapCool3(value);
}

// Convert a grid to a threejs texture.
export function grid_to_texture(grid) {
    const size = grid.length;
    
    // Create a flattened list of colors in the form [r1,g1,b1,a1,r2,g2,b2,...]
    const data = new Uint8Array(size * size * 4);
    
    // Pre-calculate the flip index to avoid repeated calculations
    const lastRowIndex = size - 1;
    
    // Process the grid in a single pass with optimized indexing
    for (let row = 0; row < size; row++) {
        const flippedRow = lastRowIndex - row; // Calculate flipped row index once
        const rowOffset = row * size * 4;
        
        for (let col = 0; col < size; col++) {
            const pixelOffset = rowOffset + col * 4;
            const rgba = getColor(grid[flippedRow][col]);
            
            // Set all 4 values at once using array destructuring
            data[pixelOffset] = rgba[0];
            data[pixelOffset + 1] = rgba[1];
            data[pixelOffset + 2] = rgba[2];
            data[pixelOffset + 3] = rgba[3];
        }
    }
    
    // Create the texture from the data
    const texture = new THREE.DataTexture(data, size, size);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    
    return texture;
}

// Converts a grid to a single image Mesh Plane with the heatmap as a texture.
export function grid_to_image(grid) {

    let texture = grid_to_texture(grid);

    let size = grid.length;

    let geometry = new THREE.PlaneGeometry(size, size);

    let material = new THREE.MeshBasicMaterial({ map: texture, transparent:true});

    let mesh = new THREE.Mesh(geometry, material);

    return mesh
}

// Converts an image Mesh to individual pixel Meshes
export function image_to_pixels(image){

    // Heres the flattened rgba array we created earlier in grid_to_texture.
    let texture = image.material.map.source.data;
    let size = texture.height;

    let pixels = [];

    // Loop through pixel positions from the size of the image Mesh.
    for (let row = 0; row < size; row++){
        let _pixels = [];

        for (let col = 0; col < size; col++){

            let index = (col * size + row) * 4;

            // Get rgb data e.x [127,127,255]
            let r = texture.data[index];
            let g = texture.data[index+1];
            let b = texture.data[index+2];
            let a = texture.data[index+3];

            // Make a 1x1 pixel
            let geometry = new THREE.PlaneGeometry(1, 1);

            // color it using a string
            let color = new THREE.Color(`rgb(${r}, ${g}, ${b})`)
                
            // let material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent:true, opacity:alpha/255});
            let material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent:true, opacity:a/255});
            let mesh = new THREE.Mesh(geometry, material);

            _pixels.push(mesh);
        }
        pixels.push(_pixels);
    }

    return pixels;
}

let split_padding = 0;

// Splits an image Mesh into pixel Meshes and computes where to place them based on where the original image was and some padding.
export function splitImage(image){

    let pixels = image_to_pixels(image);
    
    // Get the absolute world position of the image
    let worldPosition = new THREE.Vector3();
    image.getWorldPosition(worldPosition);

    let size = pixels.length;

    let group = new THREE.Group()
    // Set the group position to the absolute world position of the image
    group.position.set(worldPosition.x, worldPosition.y, worldPosition.z)

    let offset = -size / 2 + .5 - (split_padding * (size / 2));

    for (let col = 0; col < size; col++){
        for (let row = 0; row < size; row++){

            let x =  offset + (row * (1 + split_padding)); 
            let y =  offset + (col * (1 + split_padding));
            
            let pixel = pixels[row][col];

            pixel.position.set(x, y)
            pixel.row = row;
            pixel.col = col;
            
            group.add(pixel)
        }
    }
    return group;
}

export function convert(i, row_len) {

    let row_idx = Math.floor(i / row_len);  // row index in original matrix
    let col_idx = i % row_len;  //column index
    
    // Calculate new row index
    let new_row = row_len-1 - row_idx

    // # New index in the transformed matrix
    let new_index = new_row*row_len  + col_idx

    return new_index
    }

export function updateImage(image, pixels){ 

    let texture = image.material.map.source.data.data; //images texture
    let size = pixels.children.length;

    image.selections.length = 0 //to clear selections
    
    let row_len = Math.sqrt(size)
    
    for (let index = 0; index < size; index++){
        let pixel = pixels.children[index];

        let r = pixel.material.color.r;
        let g = pixel.material.color.g;
        let b = pixel.material.color.b;
        let a = pixel.material.opacity;


        if (a !== 0.0){ 
            let patch_index = convert(index, row_len)
            image.selections.push(patch_index)   //next: push coordinates to image.selections which is global (defined in setGrids)
        }

        texture[index * 4 + 0] = r * 255;
        texture[index * 4 + 1] = g * 255;
        texture[index * 4 + 2] = b * 255;
        texture[index * 4 + 3] = a * 255;
    }
    
    console.log("image.selections:", image.selections)
    console.log("image.selections:", image.ggs) // image here means head!

    image.material.map.needsUpdate = true;
}

export function destroy(mesh){

    mesh.removeFromParent();
    mesh.geometry.dispose();
    mesh.material.dispose();
}