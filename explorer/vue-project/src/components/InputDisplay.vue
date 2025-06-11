<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';

// Define props
const props = defineProps({
    host: String,
    interventions: Array,
    loading: Boolean,
    temp: Object,
    globalSelections: Array,
    encoderValue: String,
    interventionType: String,
    start_step: Number,
    end_step: Number
});

// Define emits
const emit = defineEmits(['loading', 'newImageUrl', 'newAddends', 'update:showTimesteps']);

// Reactive state
const prompt_value = ref("unicorn");
const seed_value = ref(93244);
const isGenerating = ref(false);
const showTimesteps = ref(false);



// Generate function
async function generate() {
    try {
        isGenerating.value = true;
        emit('loading');
        
        let intervention_instance_to_apply;
        console.log('Current interventionType:', props.interventionType);

        if (props.interventionType === 'Scaling') {
            intervention_instance_to_apply = {
                name: 'Scaling',
                args: [parseFloat(props.encoderValue)],
                selections: props.globalSelections,
                start_step: props.start_step,
                end_step: props.end_step
            };
        } else {
            intervention_instance_to_apply = {
                name: 'Encoder',
                args: [props.encoderValue],
                selections: props.globalSelections,
                start_step: props.start_step,
                end_step: props.end_step
            };
        }
        
        // Create the request
        const request = {
            prompt: prompt_value.value,
            seed: seed_value.value,
            interventions: [intervention_instance_to_apply]
        };
        
        console.log("Request:", request);
        
        // Generate the image
        const startTime = performance.now();
        console.log("Starting image generation request...");
        
        const imageResponse = await fetch(`${props.host}/generate`, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        
        const endTime = performance.now();
        console.log(`Image generation completed in ${(endTime - startTime).toFixed(2)}ms`);
        
        // Process the image
        console.log("Starting image processing...");
        const imageStartTime = performance.now();
        const image = await imageResponse.blob();
        const url = URL.createObjectURL(image);
        const imageEndTime = performance.now();
        console.log(`Image processing completed in ${(imageEndTime - imageStartTime).toFixed(2)}ms`);
        emit('newImageUrl', url);
        
        // Get the addends data
        console.log("Starting addends fetch...");
        const addendsStartTime = performance.now();
        
        const addendsResponse = await fetch(`${props.host}/addends?show_timesteps=${showTimesteps.value}`, {
            method: 'GET',
        });
        
        const addends = await addendsResponse.json();
        const addendsEndTime = performance.now();
        console.log(`Addends fetch and processing completed in ${(addendsEndTime - addendsStartTime).toFixed(2)}ms`);
        emit('showTimesteps', showTimesteps.value)
        emit('newAddends', addends);
    } catch (error) {
        console.error("Generation error:", error);
    } finally {
        isGenerating.value = false;
    }
}
</script>

<template>
    <div class="input-container">
        
        <div class="input-group">
            <label for="prompt">Prompt: </label>
            <InputText id="prompt" type="text" v-model="prompt_value" />
        </div>

        <div class="input-group">
            <label for="seed">Seed: </label>
            <InputNumber id="seed" v-model="seed_value" :step="1" :min="0" :useGrouping="false" fluid />
        </div>

        <div class="input-group">
            <Checkbox id="timesteps" v-model="showTimesteps" :binary="true" />
            <label for="timesteps">Timesteps</label>
        </div>

        <Button 
            class="generate-button" 
            label="Generate" 
            icon="pi pi-play" 
            @click="generate" 
            :disabled="loading || isGenerating" 
            :loading="isGenerating" />
    </div>
</template>

<style scoped>
.input-container {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    color: rgb(0, 255, 0);
    bottom: 5px;
    border-radius: 10px;
    border: 2px solid rgb(0, 255, 0);
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.input-group {
    display: flex;
    align-items: center;
    gap: 8px;
}

.input-group label {
    font-weight: 600;
    white-space: nowrap;
}

.generate-button {
    background-color: rgb(0, 255, 0);
    color: black;
    border: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
}

.generate-button:hover:not(:disabled) {
    background-color: rgb(0, 220, 0);
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.generate-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

</style>
