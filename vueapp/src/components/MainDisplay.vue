<template>
    <div>
        <panZoom selector=".zoomable">
            <div class="attn-container zoomable">
                <div class="modules">
                    <ModuleDisplay
                        v-for="(modulegrids, index) in allgrids"
                        :key="index"
                        :modulegrids="modulegrids"
                        @patch-click="handlePatchClicks(moduleIndex, $event)"
                    />
                </div>
            </div>

        </panZoom>
    </div>
</template>




<script>
import ModuleDisplay from './ModuleDisplay.vue';

import gridData from '@/assets/gridData.json';

export default {

    name: "MainDisplay",
    
    components: {
        ModuleDisplay,

    },

    data() {
        return {
            allgrids: gridData,
            clickedPatches: {},
        };
    },

    methods: {
        handlePatchClicks(moduleIndex, { gridIndex, rowIndex, patchIndex }) {
            console.log(`patches clicked at module ${moduleIndex}`)
            
            const patchKey = `${moduleIndex}-${gridIndex}-${rowIndex}-${patchIndex}`;
            
            if (this.clickedPatches[patchKey]) {
                delete this.clickedPatches[patchKey];
            } else {
                this.$set(this.clickedPatches, patchKey, { moduleIndex, gridData, rowIndex, patchIndex})
            }
        }
    }

}
</script>





<style>

.modules {
    display: flex;
    flex-direction: row;
    align-items: center; /*  flex-end; */
    gap: 20px;

}


</style>
