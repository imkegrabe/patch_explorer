<script>

import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import gridData from '@/assets/gridData.json';

// const boxRef = ShallowRef<TresInstance | null >= shallowRef(null)

export default {
    name: "Explorer",
    components: {
        TresCanvas,
        OrbitControls

    },
    data() {
        let slicedTestGridz = gridData.slice(6, 7);
        return {
            testgrid: [[[[1, .3, .5], [.6, 1, .8], [.1, .34, .6]], [[1, .23, .25], [.6, .1, .48], [.31, .49, .36]]], [[[1, .3, .5], [.6, 1, .8], [.1, .34, .6]], [[1, .23, .25], [.6, .1, .48], [.31, .49, .36]]]],
            testGridz: gridData,
            slizedGridz: slicedTestGridz
        }
    },
    methods: {
        getColor(value) {
            const colormap = (x) => {
                let r = 255;
                let g = 255;
                
                if (x < 0) {
                r = 255 - Math.floor(255 * x);
                } //cyan for negative values / oppostise to r
                if (x > 0) {
                g = 255 - Math.floor(255 * x);
                } //meganta for positive values / oppostise to g
                
                const b = 255;
                const a = .1;

                return `rgb(${r}, ${g}, ${b})`;
            };
            return colormap(value);
    },
    },
}
</script>

<template>

    <TresCanvas window-size render-mode="on-demand" color="#FFFFFF">
        <!-- <TresPerspectiveCamera /> -->
        <TresOrthographicCamera :left="-10" :right="10" :top="10" :bottom="-10" :near="0.1" :far="100" :position="[10, 10, 10]" />
        <!-- <TresOrthographicCamera /> -->
        <OrbitControls :enableRotate="true" :enableZoom="true" :enablePan="true" :screenSpacePanning="true" :minPolarAngle="Math.PI / 2" :maxPolarAngle="Math.PI / 2" :minAzimuthAngle="0" :maxAzimuthAngle="0"/>
        
        <TresGroup v-for="layer, layer_idx in slizedGridz" :position="[layer_idx*65, 0, 0]" :key="layer_idx">

            <TresGroup v-for="head, head_idx in layer" :position="[0, head_idx*head.length + head_idx, 0]" :key="head_idx">
                
                <TresGroup v-for="row, row_idx in head" :key="row_idx">

                    <TresMesh v-for="(col, col_idx) in row" :key="col_idx" :position="[row_idx, col_idx, 0]">
                        <TresPlaneGeometry :args="[1,1]" />
                        <TresMeshBasicMaterial :color="getColor(col)"/>
                    </TresMesh>

                </TresGroup>    

            </TresGroup>
        </TresGroup>

    </TresCanvas>
    
</template>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

#app {
    height: 100%;
    width: 100%;
    background-color: #000;
}

/* .grid {
    display: flex;
    flex-direction: column;
} */
</style>
