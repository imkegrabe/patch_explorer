<script>

import { init } from '@/js/init';
import gridData from '@/assets/gridData.json';
// import title from '@/assets/title.json';
// import { grid_to_image } from '@/js/grids';
// import Sidebar from 'primevue/sidebar';

export default {
    name: "Explorer",

    props: {
        globalSelections: Array,
    },
    data() {
        return {
            // testgrids: [[[[1, .3, .5], [.6, 1, .8], [.1, .34, .6]], [[1, .23, .25], [.6, .1, .48], [.31, .49, .36]]], [[[1, .3, .5], [.6, 1, .8], [.1, .34, .6]], [[1, .23, .25], [.6, .1, .48], [.31, .49, .36]]]],
            setGrids: null,
            allGrids: gridData,
            loading: false,
            ImageUrl: null,
            interventions: [],
            temp: {},
            architecture: {},
            current_intervention_instance_applying: null
        };
    },

    methods: {
        fetchData() {
            fetch(this.host + '/init', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })
                .then(response => { return response.json() })
                .catch(error => {
                    console.error("error fetchin data:", error)
                })
        }
    },
   
    mounted() {

        // We can a reference to the "canvas" element in our <template> tag.
        // Thats where were put the WebGL canvas
        let canvas = this.$refs.canvas

        // Init WebGl with all of the functionality we need.
        // Returns a function to call when new grids are returned from the server.
        this.setGrids = init(canvas, this.globalSelections);

        // Set grids to example.
        this.setGrids(this.allGrids)

        // canvas.height = height;

    }
}

</script>


<template>
    <div class="canvas-container">
        <div ref="canvas" style="width: 100%; height: 100%; position: relative;">
        </div>
    </div>
</template>

<style>
.canvas-container {
    position: absolute;
    z-index: 0 ;
    top: 0;
    left: 0;
    width: 100vw; /* Full viewport width */
    height: 100vh; /* Full viewport height */
    overflow: hidden; /* Prevent scrollbars from appearing */
}

/* Canvas itself */
canvas {
    display: block; /* Removes extra space below the canvas in some browsers */
    width: 100%; /* Ensure canvas scales horizontally */
    height: 100%; /* Ensure canvas scales vertically */
    
}
</style>