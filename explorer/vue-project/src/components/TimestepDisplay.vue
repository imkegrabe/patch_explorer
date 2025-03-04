<script>
import SelectButton from 'primevue/selectbutton';
import Slider from 'primevue/slider';
// import { ref } from 'vue';

export default {
    name: 'TimestepDisplay',
    components: {
        SelectButton,
        Slider
    },
    props: {
        
    },


    }
import { ref } from 'vue';

const value = ref('One-Way');
const options = ref(['One-Way', 'Return']);
</script>

<template>
    <div class="timestep-container">
        <SelectButton id="view-selection" v-model="value" :options="options" />
        <Slider v-model="value" id="timestep-slider" range orientation="vertical" style="position: fixed; bottom: 200px; left: 10%; color: white;"/>

        <input type="range" id="near-slider" min="0" max="100" step="2" value="0" style="position: fixed; bottom: 200px; left: 3%; transform: translateX(-50%) rotate(-90deg);">
        <!-- <span id="near-value">100</span> -->
        <span id="near-value" style="position: fixed; bottom: 200px; left: 4%; transform: translateX(-50%);">50</span>

        <input type="range" id="far-slider" min="0" max="100" step="2" value="100" style="position: fixed; bottom: 200px; left: 5%; transform: translateX(-50%) rotate(-90deg);">
        <!-- <span id="far-value">0</span> -->
        <span id="far-value" style="position: fixed; bottom: 200px; left: 6%; transform: translateX(-50%);">0</span>
    </div>
    
</template>

<style>

</style>