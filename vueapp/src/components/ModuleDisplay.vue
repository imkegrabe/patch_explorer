<template>
    <div class="module">
    <GridDisplay
        v-for="(grid, index) in modulegrids"
        :key="index"
        :grid="grid"
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
    }
}

</script>





<style>


.module {
    display: flex;
    flex-direction: column;

}


</style>