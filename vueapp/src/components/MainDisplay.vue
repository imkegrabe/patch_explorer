<template>
    <div>
        <div class="attn-container">
            <div class="modules">
                <ModuleDisplay v-for="(modulegrids, index) in allGrids" :key="index" :modulegrids="modulegrids" :panzoom_scale="panzoom_scale"
                    @patch-click="handlePatchClicks(moduleIndex, $event)" />
            </div>
        </div>

    </div>
</template>




<script>
import panzoom from 'panzoom';
import ModuleDisplay from './ModuleDisplay.vue';


export default {

    name: "MainDisplay",

    components: {
        ModuleDisplay,

    },
    props: {
        allGrids: Array
    },
    data() {
        return {
            clickedPatches: {},
            panzoom_scale: 1.0
        }
    },
    methods: {
        handlePatchClicks(moduleIndex, { gridIndex, rowIndex, patchIndex }) {
            console.log(`patches clicked at module ${moduleIndex}`)

            const patchKey = `${moduleIndex}-${gridIndex}-${rowIndex}-${patchIndex}`;

            const gd = this.allGrids

            if (this.clickedPatches[patchKey]) {
                delete this.clickedPatches[patchKey];
            } else {
                this.$set(this.clickedPatches, patchKey, { moduleIndex, gd, rowIndex, patchIndex })
            }
        }
    },
    mounted() {


        // Select root element to enable pan zoom for
        var element = document.querySelector('.attn-container')

        // Create panzoom handler on the selected element
        var panzoom_instance = panzoom(element, {
            smoothScroll: false
        })

        var thiss = this

        // When zoomed, let components know via this.panzoom_scale
        panzoom_instance.on('zoomend', function() {

            thiss.panzoom_scale = panzoom_instance.getTransform().scale
            
        });

    }

}
</script>





<style>
.modules {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*  flex-end; */
    gap: 20px;

}
/* Makes zooming smoother */
.attn-container{
    transition: transform .5s cubic-bezier(0, 0, 0.58, 1);

}
</style>
