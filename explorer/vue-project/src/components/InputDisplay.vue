<script setup>
import { ref, markRaw } from 'vue';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import { unzipSync } from 'fflate';
import { load } from "npyjs";
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
const emit = defineEmits(['loading', 'newImageUrl', 'newAddends', 'update:showTimesteps', 'showTimesteps']);

// Reactive state
const prompt_value = ref("unicorn in universe");
const seed_value = ref(33);
const isGenerating = ref(false);
const showTimesteps = ref(false);
const hasGeneratedOnce = ref(false);
const showSecondInstruction = ref(false);

// Generate function
function restart() {
    console.log("Resetting...");
}

async function generate() {
    
    try {
        // // defocus any previously focused image
        // if (focused.value.image || focused.value.pixels) {
        //     defocus(focused.value);
        // }

        if (!hasGeneratedOnce.value) {
            hasGeneratedOnce.value = true;
        }
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
        
        const addendsResponse = await fetch(`${props.host}/addends?show_timesteps=${showTimesteps.value}`);
        const buffer = new Uint8Array(await addendsResponse.arrayBuffer());

        // Unzip .npz => a map of filename -> Uint8Array
        const files = unzipSync(buffer);

        // Parse each .npy inside the .npz
        const addends = [];
        for (const [name, data] of Object.entries(files)) {
        // Parse from the correct slice of ArrayBuffer
            const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
            const npy = await load(arrayBuffer);
            const flat = npy.data; // Int8Array
            const shape = npy.shape; // [T, heads, H, W]

            const t = shape[0];
            const heads = shape[1];
            const h = shape[2];
            const w = shape[3];

            // Build typed row views per timestep and per head
            const perTimestep = new Array(t);
            for (let ti = 0; ti < t; ti++) {
                const perHead = new Array(heads);
                for (let hi = 0; hi < heads; hi++) {
                    const rows = new Array(h);
                    const baseTH = ((ti * heads) + hi) * h * w;
                    for (let yi = 0; yi < h; yi++) {
                        const start = baseTH + yi * w;
                        rows[yi] = flat.subarray(start, start + w);
                    }
                    perHead[hi] = rows;
                }
                perTimestep[ti] = perHead;
            }
            addends.push(markRaw(perTimestep));
        }
        console.log('addends', addends);
        const addendsEndTime = performance.now();
        console.log(`Addends fetch and processing completed in ${(addendsEndTime - addendsStartTime).toFixed(2)}ms`);
        emit('showTimesteps', showTimesteps.value)
        emit('newAddends', addends);

    // showSecondInstruction.value = true;
    // // Hide second instruction after 5 seconds
    // setTimeout(() => {
    //     showSecondInstruction.value = false;
    // }, 7000);

    } catch (error) {
        console.error("Generation error:", error);
    } finally {
        isGenerating.value = false;
    }
}
</script>

<template>

    <div v-if="!hasGeneratedOnce" class="centered-message">
    <p>Explore the hidden layers of Stable Diffusion 1.4<br>by interacting with its patches.</p>
    <!-- <p>Explore the role of cross-attention heads in SD 1.4 <br>through visualization and interaction.</p> -->
    </div>

    <!-- <div class="first-instruction">
        <p v-if="!hasGeneratedOnce">Start by generating an image...</p>
        <p v-else-if="showSecondInstruction">Explore the patch activations through zooming, <br> then apply an intervention on the left.</p>
    </div> -->

    <div class="input-container">
        
        <div class="input-group">
            <label for="prompt" style="user-select: none; pointer-events: none; -webkit-user-drag: none;">Prompt: </label>
            <InputText id="prompt" type="text" v-model="prompt_value" style="background-color: rgba(255, 255, 255, 0) !important;  color: rgb(0, 255, 0) !important;"/>
        </div>

        <div class="input-group">
            <label for="seed" style="user-select: none; pointer-events: none; -webkit-user-drag: none;">Seed: </label>
            <InputNumber id="seed" v-model="seed_value" :step="1" :min="0" :useGrouping="false" fluid style="background-color: rgba(255, 255, 255, 0) !important; width: 80px;  color: rgb(0, 255, 0) !important;"/>
        </div>

        <!-- <div class="input-group tooltip-container"> -->
            <Checkbox id="timesteps" v-model="showTimesteps" :binary="true" />
            <label for="timesteps" style="user-select: none; pointer-events: none; -webkit-user-drag: none;">Timesteps</label>
            <span class="tooltip-text">Load timestep viz</span>
        <!-- </div> -->

        <Button 
            class="generate-button" 
            :label="hasGeneratedOnce ? 'RE-GENERATE' : 'GENERATE'" 
            icon="pi pi-play" 
            @click="generate" 
            :disabled="loading || isGenerating" 
            :loading="isGenerating" 
        />

        <Button 
            v-if="hasGeneratedOnce" 
            class="restart-button" 
            label="RESET" 
            icon="pi pi-refresh" 
            @click="restart" 
            :disabled="isGenerating" 
        />

    </div>
</template>

<style>
.input-container {
    overflow: visible;
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
    bottom: 15px;
    border-radius: 10px;
    /* border: 2px solid rgb(0, 255, 0); */
    padding: 15px 15px;
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(5px);
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    z-index: 1000;
    line-height: 1.4;
    overflow: hidden;
    box-shadow: 0 0 10px 4px rgba(0, 255, 0, 0.5); /* soft green glow */
    border: none; /* remove solid border */
    border-radius: 8px; /* optional subtle rounding */
    height: 50px;
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

.p-inputtext {
  background-color: rgba(255, 255, 255, 0) !important;
  color: rgb(0, 255, 0) !important;
}

.p-inputnumber input {
  background-color: rgba(255, 255, 255, 0) !important;
  color: rgb(0, 255, 0) !important;
  width: 10px;
}

.centered-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.75);
    padding: 20px 20px;
    color: rgb(0, 255, 0);
    font-size: 1.5rem;
    font-weight: bold;
    /* border: 2px solid rgb(0, 255, 0); */
    /* border-radius: 12px; */
    text-align: center;
    z-index: 999;
    pointer-events: none;
}

.tooltip-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: help; /* show help cursor on hover */
  z-index: 1000;
}

.tooltip-text {
  visibility: hidden;
  width: 220px;
  background-color: rgb(0, 255, 0);
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 6px 10px;
  position: absolute;
  bottom: 125%; /* place above */
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.7);
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1001;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}

.first-instruction {
    position: fixed;
    bottom: 1%;
    /* transform: translate(-50%, -50%); */
    background: rgba(0, 0, 0, 0);
    padding: 20px 20px;
    color: rgb(0, 255, 0);
    font-size: '10px';
    font-weight: bold;
    /* border: 2px solid rgb(0, 255, 0); */
    /* border-radius: 12px; */
    /* text-align: center; */
    z-index: 9999;
}

.restart-button {
    background-color: rgb(0, 255, 0) !important;
    color: black;
    border: none;
    font-weight: bold;
    transition: all 0.2s ease;
    /* width: 90px; */
    
}

.restart-button:hover:not(:disabled) {
    background-color: rgb(0, 255, 0) !important;
    transform: translateY(-2px);
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
    /* width: 90px; */
}

.generate-button.p-button {
  background-color: rgb(0, 255, 0) !important;
  color: black !important;
  border: none !important;
  width: 160px;
}
</style>
