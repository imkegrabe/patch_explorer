<template>
    <div class="timestep-container">
       
        <p style="padding: 20px;">Timesteps: </p>
        <Slider
            v-model="range" 
            id="timestep-slider" 
            range 
            :min="0"
            :max="50"
            step="1"
            orientation="vertical"
            />
        
        <p style="padding: 20px;">start: {{ range[0] }} end: {{ range[1] }}</p>

        <SelectButton 
            id="view-selection" 
            v-model="value"
            :options="options"
            @change="switchCamera"/>
        
            
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import SelectButton from 'primevue/selectbutton';
import Slider from 'primevue/slider';
import { cameraActive, setCameraActive } from '../js/init.js';

const emit = defineEmits(['changeViewMode']);

// the reactive vue variables
const range = ref([0, 50]);

//function to update timesteps wrt slider
watch(range, ([near, far]) => {
    if (cameraActive) {
        cameraActive.near = near * 3;
        cameraActive.far = far * 3;
        cameraActive.updateProjectionMatrix();
    }
});

//function to switch between 2D and 3D
function switchCamera() {
    console.log("changing cam");
    setCameraActive(value.value);
    emit('changeViewMode', value.value);
}

const value = ref('3D');
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
    align-items: center;
}

.double-slider{
    position: absolute;
}

.SelectButton{
    border-radius: 10px 10px 10px 10px;
    border-color: rgb(0, 255, 0);
}

.Slider {
    padding: 10px;
    background: rgb(0, 255, 0);
}

</style>