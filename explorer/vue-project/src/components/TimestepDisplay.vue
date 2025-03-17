<template>
    <div class="timestep-container">
        <SelectButton id="view-selection" v-model="value" :options="options" style="position: fixed; bottom: 100px; left: 10%; color: white;"/>
            
        <Slider v-model="value" id="timestep-slider" range orientation="vertical" style="position: fixed; bottom: 200px; left: 10%; color: white;"/>

        <div class="double-slider">
            <input type="range" id="near-slider" min="0" max="100" step="2" value="0" style="position: fixed; bottom: 200px; left: 3%; transform: translateX(-50%) rotate(-90deg);">
            <span id="near-value" style="position: fixed; bottom: 200px; left: 4%; transform: translateX(-50%);">50</span>

            <input type="range" id="far-slider" min="0" max="100" step="2" value="100" style="position: fixed; bottom: 200px; left: 5%; transform: translateX(-50%) rotate(-90deg);">
            <span id="far-value" style="position: fixed; bottom: 200px; left: 6%; transform: translateX(-50%);">0</span>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import SelectButton from 'primevue/selectbutton';
import Slider from 'primevue/slider';

// Reactive variables
const value = ref('2D');
const options = ref(['2D', '3D']);
// const range = ref([0, 100]); // Uncomment if you plan to use this
</script>

<style>

.timestep-container{
    position: absolute;
    display: flex;
    flex-direction: column;
}

.double-slider{
    position: absolute;
}

</style>