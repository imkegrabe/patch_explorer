<template>
    <div class="module">
        
        <div v-for="(grid, gridIndex) in module" :key="gridIndex">
            <!-- <h1 class="module-title">Head {{ gridIndex + 1 }}</h1> -->
            <GridDisplay
                :grid="grid"
                :current_intervention_instance_applying="current_intervention_instance_applying"
                @patch-draw="(patches)=>handlePatchDraw(gridIndex, patches)"
            />
        </div>
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

.layer {
  margin-bottom: 0.5em; /* Adds space between each layer */
}

.module-title {
    font-family: 'Courier', monospace;
  font-size: 0.1em;
  text-align: center;
  margin-bottom: 0.1em;
  opacity: 0.5;
}

</style>