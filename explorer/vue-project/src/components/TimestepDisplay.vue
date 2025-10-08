<template>
    <div class="timestep-container">
      <p style="padding: 20px;"><b>Timesteps:</b></p>
  
      <!-- Slider + floating labels -->
      <div class="slider-wrapper">
        <Slider
          v-model="range"
          id="timestep-slider"
          range
          :min="minValue"
          :max="maxValue"
          :step="1"
          orientation="vertical"
        />
  
        <!-- Floating labels following slider handles -->
        <div
          v-for="(pos, i) in handlePositions"
          :key="i"
          class="slider-label"
          :style="{ bottom: pos + '%' }"
        >
          <div v-if="!editing[i]" @click="startEdit(i)">
            {{ range[i] }}
          </div>
          <input
            v-else
            v-model.number="tempValues[i]"
            @keyup.enter="applyEdit(i)"
            @blur="applyEdit(i)"
            class="slider-input"
          />
        </div>
      </div>
  
      <p style="padding: 20px;"><b>View:</b></p>
      <SelectButton
        id="view-selection"
        v-model="value"
        :options="options"
        @change="switchCamera"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, nextTick } from 'vue';
  import SelectButton from 'primevue/selectbutton';
  import Slider from 'primevue/slider';
  import { cameraActive, setCameraActive, timestep_groups, requestRender, forceRender } from '../js/init.js';
  
  const emit = defineEmits(['changeViewMode', 'updateTimesteps']);
  
  // slider bounds
  const minValue = 1;
  const maxValue = 50;
  
  // reactive state
  const range = ref([1, 50]);
  
  // computed label positions (percent along slider) — reactive to range
  const handlePositions = computed(() =>
    range.value.map(v => ((v - minValue) / (maxValue - minValue)) * 100)
  );
  
  // inline editing state for each handle
  const editing = ref([false, false]);
  const tempValues = ref([range.value[0], range.value[1]]);
  
  function startEdit(index) {
    // sync temp value to current range and enter edit mode
    tempValues.value[index] = range.value[index];
    editing.value[index] = true;
    nextTick(() => {
      const inputs = document.querySelectorAll('.slider-input');
      if (inputs[index]) inputs[index].focus();
      // select text to make typing quick
      if (inputs[index]) inputs[index].select();
    });
  }
  
  function applyEdit(index) {
    let newVal = parseInt(tempValues.value[index]);
    if (isNaN(newVal)) newVal = range.value[index]; // fallback
    newVal = Math.min(Math.max(newVal, minValue), maxValue);
  
    // update slider -> this will update computed positions automatically
    range.value[index] = newVal;
  
    // exit edit mode
    editing.value[index] = false;
  
    // ensure visualization updates immediately
    updateVisibility(range.value[0], range.value[1]);
  }
  
  // Function to reset the slider to default range
  function resetRange() {
    range.value = [minValue, maxValue];
    updateVisibility(minValue, maxValue);
  }
  
  // Make resetRange available to parent components
  defineExpose({ resetRange });
  
  // Function to update visibility with debouncing for smoother updates
  let updateTimeout = null;
  function updateVisibility(near, far) {
    if (updateTimeout) clearTimeout(updateTimeout);
  
    if (cameraActive && timestep_groups) {
      timestep_groups.forEach((group, index) => {
        // your code uses 1-based comparison, keep it consistent
        index += 1;
        const isVisible = index >= near && index <= far;
  
        if (group.visible !== isVisible) {
          group.visible = isVisible;
        }
  
        if (isVisible && !group.parent) {
          cameraActive.parent.add(group);
        } else if (!isVisible && group.parent) {
          // optional: remove from scene when hidden (keeps scene smaller)
          // group.parent.remove(group);
        }
      });
  
      // immediate and scheduled renders
      forceRender();
      requestRender();
    }
  
    // Emit to parent (slightly debounced)
    updateTimeout = setTimeout(() => {
      emit('updateTimesteps', { start_step: near - 1, end_step: far - 1 });
    }, 50);
  }
  
  // Watch range for slider drags / programmatic changes and update viz
  watch(range, ([near, far]) => {
    updateVisibility(near, far);
  });
  
  // function to switch between 2D and 3D
  function switchCamera() {
    setCameraActive(value.value);
    emit('changeViewMode', value.value);
  
    // ensure visibility is correct for new camera
    updateVisibility(range.value[0], range.value[1]);
  }
  
  const value = ref('2D');
  const options = ref(['2D', '3D']);
  </script>
  
  <style>
  .timestep-container {
    position: fixed;
    display: flex;
    left: 15px;
    flex-direction: column;
    bottom: 50px;
    color: white;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 0 10px 4px rgba(0, 255, 0, 0.5);
    max-width: 150px;
    backdrop-filter: blur(5px);
    border-radius: 8px;
    padding: 8px 8px;
    z-index: 1000;
    color: rgb(0, 255, 0);
  }
  
  /* === Floating label slider styling === */
  .slider-wrapper {
    position: relative;
    height: 120px; /* adjust to taste; shorter if you like */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .p-slider {
    height: 100%;
  }
  
  .slider-label {
    position: absolute;
    left: 20px; /* more space between handle and number */
    transform: translateY(50%);
    color: rgb(0, 255, 0);
    font-weight: bold;
    /* background: rgba(0, 0, 0, 0.6); */
    padding: 2px 6px;
    border-radius: 4px;
    pointer-events: auto; /* enable clicking */
    white-space: nowrap;
    transition: bottom 0.1s;
    cursor: pointer;
    user-select: none;
  }
  
  .slider-input {
    width: 44px;
    background: rgba(0, 0, 0, 0.85);
    border: 1px solid rgb(0, 255, 0);
    color: rgb(0, 255, 0);
    font-weight: bold;
    border-radius: 4px;
    text-align: center;
    outline: none;
    font-size: 0.9rem;
  }
  
  /* === Other existing styles === */
  .SelectButton {
    border-radius: 10px;
    border-color: rgb(0, 255, 0);
    box-shadow: 0 0 10px 4px rgba(0, 255, 0, 0.5);
    color: rgb(0, 255, 0);
  }
  
  .Slider {
    padding: 10px;
    background: rgb(0, 255, 0);
    color: rgb(0, 255, 0);
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
    text-align: center;
    z-index: 999;
    pointer-events: none;
    animation: fadeOut 4s forwards;
  }
  
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  </style>
  