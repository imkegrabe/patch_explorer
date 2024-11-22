<script>

import { init } from '@/js/init';
import gridData from '@/assets/gridData.json';
// import title from '@/assets/title.json';
// import { grid_to_image } from '@/js/grids';

export default {
    name: "Explorer",
    props: {
        host: String
    },

    data() {
        return {
            //grids: [[[0, .5, .5], [1, 0, 1], [0, .2, .5]], [[1, 1, 1], [0,0,0], [.5,.5,.5]]],
            // grids: [[[1,1,1,1,1,1, 1], [1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1],[1,1,1,1,1,1, 1]], [[0,0,0],[.5,.5,.5], [1,1,1]]], 
            // testgrid: [[[[1, .3, .5], [.6, 1, .8], [.1, .34, .6]], [[1, .23, .25], [.6, .1, .48], [.31, .49, .36]]], [[[1, .3, .5], [.6, 1, .8], [.1, .34, .6]], [[1, .23, .25], [.6, .1, .48], [.31, .49, .36]]]],
            setGrids: null,
            allGrids: gridData,
            // title: title

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
        this.setGrids = init(canvas);

        // Set grids to example.
        this.setGrids(this.allGrids)

    }
}

</script>


<template>

    <!-- <div >
            <div ref="headerCanvas"></div>
    </div> -->

    <div>
        <div ref="canvas">

        </div>
    </div>

</template>