<template>
    <div class="timestep-container">
       
        <p style="padding: 20px;">Timesteps: </p>
        <Slider
            v-model="range" 
            id="timestep-slider" 
            range 
            :min="1"
            :max="50"
            :step="1"
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
import { cameraActive, setCameraActive, timestep_groups, requestRender, forceRender } from '../js/init.js';

const emit = defineEmits(['changeViewMode', 'updateTimesteps']);

// the reactive vue variables
const range = ref([1, 50]);

// Function to reset the slider to default range
function resetRange() {
    range.value = [1, 50];
    updateVisibility(1, 50);
}

// Make resetRange available to parent components
defineExpose({ resetRange });

// Function to update visibility with debouncing for smoother updates
let updateTimeout = null;
function updateVisibility(near, far) {
    // Clear any pending timeouts
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
    
    // Immediately update visibility for better responsiveness
    if (cameraActive && timestep_groups) {
        timestep_groups.forEach((group, index) => {
            // Update group visibility

            index += 1;         
            const isVisible = (index >= near && index <= far);
            
            // Only modify the DOM if visibility changed
            if (group.visible !== isVisible) {
                group.visible = isVisible;
            }
            
            // Add to scene if not already there
            if (isVisible && !group.parent) {
                cameraActive.parent.add(group);
            }
        });
        
        // Force render to see changes immediately - use direct rendering
        forceRender();
        
        // Also schedule a regular render
        requestRender();
    }
    
    // Emit the timestep values to parent component with slight delay
    // to avoid too many events during rapid slider movement
    updateTimeout = setTimeout(() => {
        emit('updateTimesteps', { start_step: near - 1, end_step: far - 1 });
    }, 50);
}

//function to update timesteps wrt slider
watch(range, ([near, far]) => {
    updateVisibility(near, far);
});

//function to switch between 2D and 3D
function switchCamera() {
    console.log("changing cam");
    setCameraActive(value.value);
    emit('changeViewMode', value.value);
    
    // Update visibility after camera switch to ensure correct state
    updateVisibility(range.value[0], range.value[1]);
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
    left: 0%; 
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