<script>
import Explorer from './components/Explorer.vue';
import InputDisplay from './components/InputDisplay.vue';
import ImageDisplay from './components/ImageDisplay.vue';
import InterventionDisplay from './components/InterventionDisplay.vue';

export default {
  name: 'App',

  data() {
    return {
      isImageRowVisible: true,
      globalSelections: []
    }
  },

  components: {
    Explorer,
    ImageDisplay,
    InterventionDisplay,
    InputDisplay
    },

    methods: {
    updateImage(url) {
      this.imageUrl = url;
      console.log("updating image")
      this.$forceUpdate()
    },
    updateAddends(addends) {
      this.$refs.explorer_container.setGrids(addends)
    }
  }
}
</script>


<template>
  <div>

    <Explorer class="explorer" position="absolute" ref="explorer_container" :globalSelections="globalSelections"></Explorer>

    <div class="header">
      <img src="@/assets/patch-explorer.svg" alt="Header Image saying Patch Explorer in pixels font" />
    </div>

    <InterventionDisplay></InterventionDisplay>

    <!-- <div class="image-row">
      <ImageDisplay
        :imageUrl="imageUrl"
        ></ImageDisplay>
    </div> -->

    <InputDisplay position="absolute"
      @newImageUrl="(url) => updateImage(url)" 
      @newAddends="(addends) => updateAddends(addends)"
      :globalSelections="globalSelections"
      :host="'http://localhost:8003'" 
      :interventions="[]" 
      :loading="false"  
      :temp="[]"
    ></InputDisplay>

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
    /* width: 150vh; */
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.header img {
  max-height: 100%; /* Ensures the image doesn’t overflow the header’s height */
  width: auto; /* Maintains the aspect ratio */
  height: 120px; /* Set a specific height for better control */
  display: block;
}

@media (max-width: 768px) {
    .header img {
        width: 90%; /* Shrinks the image to fit smaller screens */
    }
}
</style>
