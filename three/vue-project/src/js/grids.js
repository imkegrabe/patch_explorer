// This file should handle operations on grids but not change the scene itself.

import * as THREE from 'three';

let alpha = 150;

export function getColor(value) {
    const cmapCool = (x) => {
        // const r = Math.floor(255 * x);
        // const g = Math.floor(255 * (1 - x));
        // const b = 255;
        let r = 255;
        let g = 255;
        let b = 255;
        alpha = 0;
        // let alpha = 5;

        if (x > 0) {
            g = 0;
            alpha = x*2;
            r = 255;
            b = 255;
        }

        // if (x > -5 && x < 15) {
        //     r = 220;
        //     g = 220;
        //     b = 220;
        // }

        if (x < 0) {
            r = 0;
            alpha = Math.abs(x*2);
            g = 255;
            b = 255;
        }

        // if (x > -15 && x < 15) {
        //     alpha = 0;
        // }
        // let alpha = Math.abs(x*5);
        // const alpha = 75;
        return [r, g, b, alpha]
    };

    return cmapCool(value);
}

// Convert a grid to a threejs texture.
export function grid_to_texture(grid) {

    let size = grid.length;

    // Need to create a flattened list of colors
    // In the form [r1,g2,b1,a1,r2,g2,b2,...]
    let texture = new Uint8Array(size * size * 4);

    for (let row = size-1; row >= 0; row--) { // we loop through the grid just to get the shape
        for (let col = 0; col < size; col++) {
            let index = (row * size + col) * 4;

            let rgba = getColor(grid[size-(row+1)][col]); // then start with the value from the last row, because image data is upsite down hehe :)

            texture[index] = rgba[0];
            texture[index + 1] = rgba[1];
            texture[index + 2] = rgba[2];
            texture[index + 3] = rgba[3];
        }
    }

    texture = new THREE.DataTexture(texture, size, size);
    // Need this or else the colors are weird.
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true;

    return texture
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
                
            let material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent:a !== 255, opacity:alpha/255});
        
            let mesh = new THREE.Mesh(geometry, material);

            _pixels.push(mesh);
        }
        pixels.push(_pixels);
    }

    return pixels;
}

let split_padding = .05;

// Splits an image Mesh into pixel Meshes and computes where to place them based on where the original image was and some padding.
export function splitImage(image){

    let pixels = image_to_pixels(image);
    let position = image.position;

    let size = pixels.length;

    let group = new THREE.Group()
    group.position.set(position.x, position.y)

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
    console.log("old row is", row_idx)
    let col_idx = i % row_len;  //column index
    console.log("col is", col_idx)
    
    // Calculate new row index
    let new_row = row_len-1 - row_idx
    console.log("new row is", new_row)

    // # New index in the transformed matrix
    let new_index = new_row*row_len  + col_idx
    console.log("therefore new idx is", new_index)

    return new_index
    }

// transfers the pixel-meshes transparency to the image-mesh
export function updateImage(image, pixels){ 

    let texture = image.material.map.source.data.data; //images texture
    let size = pixels.children.length;
    console.log("pixels.children.length", size)

    image.selections.length = 0 //to clear selections
    
    let row_len = Math.sqrt(size)
    
    for (let index = 0; index < size; index++){
        let aindex = index * 4 + 3;
        let pixel = pixels.children[index];

        let a = alpha;

        if (!pixel.material.transparent){ //instead of setting the 
            a = 255;
            let patch_index = convert(index, row_len)
            image.selections.push(patch_index)   //next: push coordinates to image.selections which is global (defined in setGrids)
         }

        texture[aindex] = a;
    }
    console.log("image.selections:", image.selections) // image here means head!

    image.material.map.needsUpdate = true;

}

export function destroy(mesh){

    mesh.removeFromParent();
    mesh.geometry.dispose();
    mesh.material.dispose();
}