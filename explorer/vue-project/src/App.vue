<script>
import Explorer from './components/Explorer.vue';
import InputDisplay from './components/InputDisplay.vue';
import ImageDisplay from './components/ImageDisplay.vue';
import InterventionDisplay from './components/InterventionDisplay.vue';
import TimestepDisplay from './components/TimestepDisplay.vue';
import { setAlphaDivisor } from './js/grids';
import Button from 'primevue/button';

export default {
  name: 'App',

  data() {
    return {
      isImageRowVisible: true,
      globalSelections: [],
      encoderValue: "",
      interventionType: "",
      start_step: 0,
      end_step: 50,
      showTimesteps: false,
      isMobile : false,
      showHelp: true,
    }
  },

  mounted() {
    // Detect mobile devices
    this.isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  },

  components: {
    Explorer,
    ImageDisplay,
    InterventionDisplay,
    InputDisplay,
    TimestepDisplay,
    Button,
    },

    methods: {
    updateImage(url) {
      this.imageUrl = url;
      console.log("updating image")
      this.$forceUpdate()
    },
    updateAddends(addends) {
      this.$refs.explorer_container.setGrids(addends)
      this.$refs.timestep_display.resetRange()
    },
    updateTimesteps({ start_step, end_step }) {
      this.start_step = start_step;
      this.end_step = end_step;
      console.log(start_step, end_step)
    },
    updateShowTimesteps(value) {
      this.showTimesteps = value;
      console.log("updating showTimesteps", value)
      setAlphaDivisor(value);
    }
  }
}


</script>



<template>
  <div v-if="isMobile" class="mobile-note">
    For the best experience, please visit this site in a desktop browser. Learn more about the project
    <a href="https://patch.baulab.info" target="_blank" rel="noopener" class="mobile-note-link">
      here
    </a>.
  </div>


  <div>

    <Explorer class="explorer" position="absolute" ref="explorer_container" :globalSelections="globalSelections"></Explorer>

    <div class="header">
      <img src="@/assets/patch-explorer-logo-green.svg" alt="Header Image saying Patch Explorer in pixels font" />
    </div>

    <InterventionDisplay v-if="!isMobile"
      v-model:encoderValue="encoderValue"
      v-model:interventionType="interventionType"
    ></InterventionDisplay>

    <div v-if="!isMobile" class="image-row">
      <ImageDisplay
        :imageUrl="imageUrl"
        ></ImageDisplay>
    </div>

    <InputDisplay v-if="!isMobile" position="absolute"
      @newImageUrl="(url) => updateImage(url)" 
      @newAddends="(addends) => updateAddends(addends)"
      :globalSelections="globalSelections"
      :host="'https://bippu.baulab.us'" 
      :interventions="[]" 
      :loading="false"  
      :temp="[]"
      :encoderValue="encoderValue"
      :interventionType="interventionType"
      :start_step="start_step"
      :end_step="end_step"
      @showTimesteps="updateShowTimesteps"
    ></InputDisplay>

    <TimestepDisplay v-if="!isMobile" v-show="showTimesteps" @updateTimesteps="updateTimesteps" ref="timestep_display"></TimestepDisplay>

    <a v-if="!isMobile" href="https://patch.baulab.info" class="info-link" title="More info">i</a>

    <div class="tooltip-container built-with">
      <a href="https://nnsight.net/" target="_blank" rel="noopener">
        <img src="@/assets/nnsight_logo-3.svg" alt="Logo" class="built-with-logo" />
      </a>
      <!-- <div class="tooltip-text">
        Built with Patch Explorer
      </div> -->
    </div>

    <div v-if="!isMobile" class="help-container">
      <Button class="help-button" label="HELP?" @click="showHelp = !showHelp" />
      <div v-if="showHelp" class="help-panel">
        <ol>
        <li>Generate an image.</li>
        <li>Inspect the patches by zooming and dragging.</li>
        <li>Choose an intervention and apply it to selected patches.</li>
        <li>Re-generate.</li>
        </ol>
      </div>
</div>


  </div>
</template>

<style scoped>
#app {
  background-color: white;
}

.image-row {
  position: fixed;
    right: 0;
    height: 100%; /* Adjust height as needed */
    color: white;
    display: flex;
    justify-content: center; /* Distributes buttons evenly */
    align-items: center;
    z-index: 100; /* Ensures it stays above other content */
}

.control-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px; /* Adjust height as needed */
    background-color: #222; /* Dark background for contrast */
    color: white;
    display: flex;
    justify-content: space-around; /* Distributes buttons evenly */
    align-items: center;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5); /* Adds a subtle shadow */
    z-index: 100; /* Ensures it stays above other content */
}

.header {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.header img {
  max-height: 100%; /* Ensures the image doesn't overflow the header's height */
  width: auto; /* Maintains the aspect ratio */
  height: 100px; /* Set a specific height for better control */
  display: block;
  user-select: none;       /* Prevents text/image selection */
  pointer-events: none;    /* Makes the image ignore mouse events */
  -webkit-user-drag: none; /* Prevents image dragging in Safari/Chrome */
}

@media (max-width: 768px) {
    .header img {
        width: 90%; /* Shrinks the image to fit smaller screens */
    }
}

.info-link {
      position: absolute;
      top: 10px;
      right: 10px;
      top: 20px;
      right: 20px;
      font-family: Courier, monospace;
      font-size: 20px;
      text-decoration: none;
      color: #000;
      background-color: rgb(0, 255, 0);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-shadow: 0 0 2px rgba(0,0,0,0.2);
      cursor: pointer;
      z-index: 10000;
    }

.info-link:hover {
      background-color: #ddd;
    }

.mobile-note {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.75);
    padding: 20px 20px;
    color: rgb(0, 255, 0);
    font-size: 1.0rem;
    /* font-weight: bold; */
    /* border: 2px solid rgb(0, 255, 0); */
    /* border-radius: 12px; */
    text-align: center;
    z-index: 999;
    pointer-events: none;
}

.mobile-note a.mobile-note-link {
  text-decoration: underline;
  display: inline-block;
  color: rgb(0, 255, 0);
  font-weight: bold;
  z-index: 1000;
  cursor: pointer;
  pointer-events: auto;
}

.built-with {
  position: fixed;
  bottom: 15px;
  right: 15px;
  display: inline-flex;
  align-items: center;
  z-index: 1000;
}

/* The logo itself */
.built-with-logo {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

/* Tooltip styling */
.tooltip-text {
  visibility: hidden;
  width: 220px;
  background-color: rgb(0, 255, 0);
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 6px 10px;
  position: absolute;
  bottom: 125%; /* place tooltip above */
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.7);
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1001;
  right: 20px;
}

/* Show tooltip on hover */
.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
.help-container {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000;
}

.help-button {
  font-weight: bold;
  background-color: rgb(0, 255, 0) !important;
  color: black !important;
  border: none;
  top: 10px;
  /* padding: 0.75rem 1.5rem; */
  min-width: 100px;
  /* font-size: 1rem; */
  /* z-index: 1000; */
  cursor: pointer;
}
.help-button span {
  color: black !important;
}

.help-button:hover {
  background-color: rgb(0, 220, 0);
  transform: translateY(-2px);
}
.help-panel {
  position: absolute;
  top: 60px;
  width: 370px; /* fixed width or adjust */
  background-color: rgba(0,0,0,0);
  color: rgb(0,255,0);
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.4;
  box-shadow: 0 0 4px 4px rgba(0, 255, 0, 0.5);
  z-index: 2000;
}
</style>