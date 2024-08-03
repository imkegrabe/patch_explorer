<template>
    <div class="module">
    <GridDisplay
        v-for="(grid, gridIndex) in module"
        :key="gridIndex"
        :grid="grid"
        :current_intervention_instance_applying="current_intervention_instance_applying"
        @patch-draw="(patches)=>handlePatchDraw(gridIndex, patches)"
    />
    </div>
</template>


<script>

import GridDisplay from './GridDisplay.vue';

export default {

    name: "ModuleDisplay",

    components: {
        GridDisplay
    },
    
    props:  {
        module: {
            type: Array,
            required: true
        },
        current_intervention_instance_applying: Object
    },

    methods: {
        handlePatchDraw(grid_idx,  patches) {
            console.log(`patch draw registered at grid ${grid_idx}, emitting dict:`, {[grid_idx] : patches});
            this.$emit('grid-draw', grid_idx, patches);
        }
    }
};

</script>





<style>
.module {
    display: flex;
    flex-direction: column;
}

</style>