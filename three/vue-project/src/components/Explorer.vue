<script>

import { init } from '@/js/init';
import gridData from '@/assets/gridData.json';
import title from '@/assets/title.json';
import { grid_to_image } from '@/js/grids';

export default {
    name: "Explorer",

    data() {
        return {
            //grids: [[[0, .5, .5], [1, 0, 1], [0, .2, .5]], [[1, 1, 1], [0,0,0], [.5,.5,.5]]],
            grids: [[[1,1,1,1,1,1, 1], [1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1]], [[0,0,0],[.5,.5,.5], [1,1,1]]], 
            testgrid: [[[[1, .3, .5], [.6, 1, .8], [.1, .34, .6]], [[1, .23, .25], [.6, .1, .48], [.31, .49, .36]]], [[[1, .3, .5], [.6, 1, .8], [.1, .34, .6]], [[1, .23, .25], [.6, .1, .48], [.31, .49, .36]]]],
            setGrids: null,
            testGridz: gridData,
            title: title
        }
    },
   
    mounted() {

        // We can a refernce to the "canvas" element in our <template> tag.
        // Thats where were put the WebGL canvas
        let canvas = this.$refs.canvas

        // Init WebGl with all of the functionality we need.
        // Returns a function to call when new grids are returned from the server.
        this.setGrids = init(canvas);

        // Set grids to example. Imke you will have to changes this to add another grid dimension
        // (layer X head X (row x column))
        this.setGrids(this.testGridz)

    }
}

</script>


<template>

    <div >
            <div ref="headerCanvas"></div>
    </div>

    <div>
        <div ref="canvas">

        </div>
    </div>

</template>