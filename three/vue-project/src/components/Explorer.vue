<script>

import { init } from '@/js/init';

export default {
    name: "Explorer",

    data() {
        return {
            //grids: [[[0, .5, .5], [1, 0, 1], [0, .2, .5]], [[1, 1, 1], [0,0,0], [.5,.5,.5]]],
            grids: [[[1,1,1,1,1,1, 1], [1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1]], [[0,0,0],[.5,.5,.5], [1,1,1]]], 
            setGrids: null
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
        this.setGrids(this.grids)
        

    }
}

</script>


<template>
    <div>
        <div ref="canvas">

        </div>
    </div>

</template>


<style></style>