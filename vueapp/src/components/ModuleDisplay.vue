<template>
    <div class="module">
    <GridDisplay
        v-for="(grid, index) in modulegrids"
        :key="index"
        :grid="grid"
        @patch-click="handlePatchClick(index, $event)"
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
        modulegrids: {
            type: Array,
            required: true
        }
    },

    methods: {
        handlePatchClick(gridIndex,  {rowIndex, patchIndex}) {
            console.log(`patch clicked at grid ${gridIndex}`)
            this.$emit('patch-click', { gridIndex, rowIndex, patchIndex });
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