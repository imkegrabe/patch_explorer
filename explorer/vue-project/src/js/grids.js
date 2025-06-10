// This file should handle operations on grids but not change the scene itself.

import * as THREE from 'three';

let alpha_divisor = 5;

export function setAlphaDivisor(showTimesteps) {
    alpha_divisor = showTimesteps ? 5 : .25;
}

export function getColor(value) {
    const cmapCool3 = (x) => {
        const r = x > 0 ? 255 : 0;
        const g = x < 0 ? 255 : 0;
        // const g = 0;
        const b = 255;
        const alpha = Math.abs(x / alpha_divisor); //*2
        return [r, g, b, alpha]
    };

    return cmapCool3(value);
}

let layer_padding = 20;
let head_padding = 5;
let timestep_padding = 3;

export function initialize(grids_by_layer, num_timesteps=50) {
    let height = 0;
    let width = 0;

    let selection_group = new THREE.Group();

    // First pass to determine the maximum height across all layers
    grids_by_layer.forEach((layer) => {
        layer = layer[0];
        let head_height = layer[0].length;
        let total_layer_height = (head_height * layer.length) + (head_padding * (layer.length - 1));
        if (total_layer_height > height) {
            height = total_layer_height;
        }
    });

    grids_by_layer.forEach((layer, layer_idx) => {
        layer = layer[0];

        let head_height = layer[0].length;
        let head_width = layer[0][0].length;

        // Calculate the total height of this layer
        let total_layer_height = (head_height * layer.length) + (head_padding * (layer.length - 1));
        
        // Calculate vertical offset to center this layer
        let vertical_offset = (height - total_layer_height) / 2;

        let layer_selection_group = new THREE.Group();
        layer_selection_group.position.set(width, 0);
        selection_group.add(layer_selection_group);

        let layer_height = vertical_offset; // Start from the vertical offset

        layer.forEach((head, head_idx) => {
            let geometry = new THREE.PlaneGeometry(head_width, head_height);

            let data = new Uint8Array(head_width * head_height * 4);

            let texture = new THREE.DataTexture(
                data,
                head_width,
                head_height,
                THREE.RGBAFormat
            );
            texture.colorSpace = THREE.SRGBColorSpace;

            let material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

            let mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(head_width / 2, layer_height + head_height / 2);

            layer_selection_group.add(mesh);

            layer_height += head_height + head_padding;
        });

        width += head_width + layer_padding;
    });

    width -= layer_padding;

    selection_group.position.set(-width / 2, -height / 2, grids_by_layer[0].length * timestep_padding + 1);

    let timestep_images = [];

    let geometry = new THREE.PlaneGeometry(width, height);

    for (let timestep_idx = 0; timestep_idx < num_timesteps; timestep_idx++) {
        let data = new Uint8Array(width * height * 4);

        let texture = new THREE.DataTexture(
            data,
            width,
            height,
            THREE.RGBAFormat
        );
        texture.colorSpace = THREE.SRGBColorSpace;

        let material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, timestep_idx * timestep_padding);

        mesh.frustumCulled = true;

        timestep_images.push(mesh);
    }

    return [timestep_images, selection_group];
}




export function load(grids_by_layer, timestep_images) {
    const texture_width = timestep_images[0].material.map.image.width;
    const texture_height = timestep_images[0].material.map.image.height;
    
    // Pre-allocate arrays for each timestep texture for faster access
    const textures = timestep_images.map(image => image.material.map.image.data);
    const textureCount = timestep_images.length;
    
    let x_offset = 0;

    // First calculate the total height needed for each layer
    const layerHeights = [];
    for (let layer_idx = 0; layer_idx < grids_by_layer.length; layer_idx++) {
        const layer = grids_by_layer[layer_idx];
        const head_height = layer[0][0].length;
        const total_layer_height = (head_height * layer[0].length) + (head_padding * (layer[0].length - 1));
        layerHeights.push(total_layer_height);
    }

    for (let layer_idx = 0; layer_idx < grids_by_layer.length; layer_idx++) {
        const layer = grids_by_layer[layer_idx];
        
        // Calculate vertical centering offset for this layer
        const layer_height = layerHeights[layer_idx];
        const vertical_centering = Math.floor((texture_height - layer_height) / 2);
        let y_offset = vertical_centering;

        const head_height = layer[0][0].length;
        const head_width = layer[0][0][0].length;

        for (let head_idx = 0; head_idx < layer[0].length; head_idx++) {
            // Process all pixels for this head across all timesteps at once
            for (let head_y = 0; head_y < head_height; head_y++) {
                // Start from the bottom of the texture and work up
                const y = texture_height - 1 - y_offset - head_y;
                
                for (let head_x = 0; head_x < head_width; head_x++) {
                    const x = x_offset + head_x;
                    const index = 4 * (y * texture_width + x);
                    
                    // Update all timesteps for this pixel position
                    for (let timestep_idx = 0; timestep_idx < layer.length; timestep_idx++) {
                        const value = layer[timestep_idx][head_idx][head_y][head_x];
                        const rgba = getColor(value);
                        const texture = textures[timestep_idx];
                        
                        texture[index] = rgba[0];     // R
                        texture[index + 1] = rgba[1]; // G
                        texture[index + 2] = rgba[2]; // B
                        texture[index + 3] = rgba[3]; // A
                    }

                // If there are more timestep images than timesteps in the layer, set remaining to 0
                for (let timestep_idx = layer.length; timestep_idx < textureCount; timestep_idx++) {
                    const texture = textures[timestep_idx];
                    texture[index] = 0;     // R
                    texture[index + 1] = 0; // G
                    texture[index + 2] = 0; // B
                    texture[index + 3] = 0; // A
                }
                }
            }
            // Add padding between heads
            y_offset += head_height + head_padding;
        }

        // Add padding between layers
        x_offset += head_width + layer_padding;
    }

    // Mark all textures as needing update
    for (let i = 0; i < timestep_images.length; i++) {
        timestep_images[i].material.map.needsUpdate = true;
    }
}

// Converts an image Mesh to individual pixel Meshes
export function image_to_pixels(image) {

    let texture = image.material.map.source.data;
    let size = texture.height;

    // Shared geometry for all pixels
    let geometry = new THREE.PlaneGeometry(1, 1);
    let pixels = [];

    // Loop through pixel positions from the size of the image Mesh.
    for (let row = 0; row < size; row++) {
        let _pixels = [];

        for (let col = 0; col < size; col++) {
            let index = (col * size + row) * 4;

            // Get rgb data e.x [127,127,255]
            let r = texture.data[index];
            let g = texture.data[index + 1];
            let b = texture.data[index + 2];
            let a = texture.data[index + 3];

            // color it using a string
            let color = new THREE.Color(`rgb(${r}, ${g}, ${b})`)

            let material = new THREE.MeshBasicMaterial({
                color: color,
                side: THREE.FrontSide,
                transparent: true,
                opacity: a / 255,
                // Restore original transparency handling
                depthWrite: true
            });
            let mesh = new THREE.Mesh(geometry, material);
            mesh.frustumCulled = true;

            _pixels.push(mesh);
        }
        pixels.push(_pixels);
    }

    return pixels;
}

let split_padding = 0;

// Splits an image Mesh into pixel Meshes and computes where to place them based on where the original image was and some padding.
export function splitImage(image) {

    let pixels = image_to_pixels(image);

    // Get the absolute world position of the image
    let worldPosition = new THREE.Vector3();
    image.getWorldPosition(worldPosition);

    let size = pixels.length;

    let group = new THREE.Group()
    let border = new THREE.Group()
    // Set the group position to the absolute world position of the image
    group.position.set(worldPosition.x, worldPosition.y, worldPosition.z)
    border.position.set(worldPosition.x, worldPosition.y, worldPosition.z)
    
    let offset = -size / 2 + .5 - (split_padding * (size / 2));

    for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {

            let x = offset + (row * (1 + split_padding));
            let y = offset + (col * (1 + split_padding));

            let pixel = pixels[row][col];

            pixel.position.set(x, y)
            pixel.row = row;
            pixel.col = col;

            group.add(pixel)
        }
    }
    // === GREEN STROKE BORDER ===
    let half = (size * (1 + split_padding)) / 2 - 0.5;
    let edgeOffset = 0.5;

    const strokeGeometry = new THREE.BufferGeometry();
    const strokeMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

    const points = [
        new THREE.Vector3(-half - edgeOffset, -half - edgeOffset, 0.01),
        new THREE.Vector3( half + edgeOffset, -half - edgeOffset, 0.01),
        new THREE.Vector3( half + edgeOffset,  half + edgeOffset, 0.01),
        new THREE.Vector3(-half - edgeOffset,  half + edgeOffset, 0.01),
        new THREE.Vector3(-half - edgeOffset, -half - edgeOffset, 0.01), // close loop
    ];

    strokeGeometry.setFromPoints(points);
    const line = new THREE.Line(strokeGeometry, strokeMaterial);

    // line.position.copy(group.position);
    border.add(line);
    
    return group, border;
}

export function convert(i, row_len) {

    let row_idx = Math.floor(i / row_len);  // row index in original matrix
    let col_idx = i % row_len;  //column index

    // Calculate new row index
    let new_row = row_len - 1 - row_idx

    // # New index in the transformed matrix
    let new_index = new_row * row_len + col_idx

    return new_index
}

export function updateImage(image, pixels) {

    let texture = image.material.map.source.data.data; //images texture
    let size = pixels.children.length;

    image.selections.length = 0 //to clear selections

    let row_len = Math.sqrt(size)

    for (let index = 0; index < size; index++) {
        let pixel = pixels.children[index];

        let r = pixel.material.color.r;
        let g = pixel.material.color.g;
        let b = pixel.material.color.b;
        let a = pixel.material.opacity;


        if (a !== 0.0) {
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

export function destroy(mesh) {

    mesh.removeFromParent();
    mesh.geometry.dispose();
    mesh.material.dispose();
}