<template>
    <div>
        <div class="attn-container">
            <div class="modules">
                <ModuleDisplay v-for="(module, moduleIndex) in allGrids" :key="moduleIndex" :module="module"
                        :current_intervention_instance_applying="current_intervention_instance_applying"
                    @grid-draw="handleGridDraw(moduleIndex, $event)" />
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
        allGrids: Array,
        current_intervention_instance_applying: Object
    },
    data() {
        return {
            clickedPatches: {}
        }
    },
    methods: {
        handleGridDraw (moduleIndex, gridPatches) {
            console.log(`grid draw registered at module ${moduleIndex}, emitting dict:`, {[moduleIndex] : gridPatches});
            this.$emit('module-draw', {[moduleIndex] : gridPatches});
        }
        // handlePatchClicks(moduleIndex, { gridIndex, rowIndex, patchIndex }) {
        //     console.log(`patches clicked at module ${moduleIndex}`)
            
        //     const patchKey = `${moduleIndex}-${gridIndex}-${rowIndex}-${patchIndex}`;

        //     const gd = this.allGrids
            
        //     if (this.clickedPatches[patchKey]) {
        //         delete this.clickedPatches[patchKey];
        //     } else {
        //         this.$set(this.clickedPatches, patchKey, { moduleIndex, gd, rowIndex, patchIndex})
        //     }
        // }
    },
    mounted() {
        // Select root element to enable pan zoom for
        var element = document.querySelector('.attn-container')
        // Create panzoom handler on the selected element
        panzoom(element, {
            smoothScroll: false
        })
    }

}
</script>


<style>
.modules {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

}

.modules {
    cursor: grab;
}

</style>
