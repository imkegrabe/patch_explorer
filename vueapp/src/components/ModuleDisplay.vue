<template>
    <div class="module">
    <GridDisplay
        v-for="(grid, gridIndex) in module"
        :key="gridIndex"
        :grid="grid"
        :current_intervention_instance_applying="current_intervention_instance_applying"
        @patch-draw="handlePatchDraw(gridIndex, $event)"
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
        handlePatchDraw(gridIndex,  patches) {
            console.log(`patch draw registered at grid ${gridIndex}, emitting dict:`, {[gridIndex] : patches});
            this.$emit('grid-draw', {[gridIndex] : patches});
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