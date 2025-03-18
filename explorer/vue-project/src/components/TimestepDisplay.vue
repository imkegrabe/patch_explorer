<template>
    <div class="timestep-container">
        <SelectButton 
            id="view-selection" 
            v-model="value"
            :options="options"
            @change="switchCamera"/>
        
            <p>Selected: {{ value }} </p>
            
        <Slider
            v-model="range" 
            id="timestep-slider" 
            range 
            :min="0"
            :max="50"
            step="1"
            orientation="vertical"
            />
        
        <p>near: {{ range[0] }} far: {{ range[1] }}</p>

        <!-- <div class="double-slider">
            <input type="range" id="near-slider" min="0" max="100" step="2" value="0" style="position: fixed; bottom: 200px; left: 3%; transform: translateX(-50%) rotate(-90deg);">
            <span id="near-value" style="position: fixed; bottom: 200px; left: 4%; transform: translateX(-50%);">50</span>

            <input type="range" id="far-slider" min="0" max="100" step="2" value="100" style="position: fixed; bottom: 200px; left: 5%; transform: translateX(-50%) rotate(-90deg);">
            <span id="far-value" style="position: fixed; bottom: 200px; left: 6%; transform: translateX(-50%);">0</span>
        </div> -->

    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import SelectButton from 'primevue/selectbutton';
import Slider from 'primevue/slider';
import { cameraActive, setCameraActive } from '../js/init.js';


// the reactive vue variables
const range = ref([0, 50]);

watch(range, ([near, far]) => {
    if (cameraActive) {
        cameraActive.near = near;
        cameraActive.far = far;
        cameraActive.updateProjectionMatrix();
    }
});

function switchCamera() {
    console.log("changing cam");
    setCameraActive(value.value);
}

const value = ref('2D');
const options = ref(['2D', '3D']);
// const range = ref([0, 100]); // Uncomment if you plan to use this
</script>

<style>

.timestep-container{
    position: absolute;
    display: flex;
    flex-direction: column;
    position: fixed; 
    bottom: 100px; 
    left: 5%; 
    color: white;
}

.double-slider{
    position: absolute;
}

.SelectButton{
    border-radius: 10px 10px 10px 10px;
    border-color: rgb(0, 255, 0);
}

</style>