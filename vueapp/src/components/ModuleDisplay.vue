<template>
    <div v-show="shouldShowZoom()" class="module">
        <GridDisplay v-for="(grid, index) in modulegrids" :key="index" :grid="grid" :clickedPatches="[]"
            @patch-click="handlePatchClick(index, $event)" />
    </div>
    <div v-show="!shouldShowZoom()" class="empty_module"
        :style="{ width: modulegrids[0].length + 'px', height: modulegrids[0].length * modulegrids.length + 'px' }">
    </div>
</template>


<script>
import GridDisplay from './GridDisplay.vue';

export default {

    name: "ModuleDisplay",

    components: {
        GridDisplay
    },
    emits: ["patch-click"],

    props: {
        modulegrids: {
            type: Array,
            required: true
        },
        panzoom_scale: {
            type: Number
        }
    },

    methods: {
        handlePatchClick(gridIndex, { rowIndex, patchIndex }) {
            console.log(`patch clicked at grid ${gridIndex}`)
            this.$emit('patch-click', { gridIndex, rowIndex, patchIndex });
        },
        shouldShowZoom() {

            var module_dim = this.modulegrids[0][0].length

            return module_dim * this.panzoom_scale >= 64
        },
        handleModuleClick() {
            
        }
    }
};

</script>





<style>
.module {
    display: flex;
    flex-direction: column;

}

.empty_module {
    background-color: grey;
    display: flex;
    flex-direction: column;
}
</style>