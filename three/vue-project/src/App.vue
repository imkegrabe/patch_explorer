<script>
import Explorer from './components/Explorer.vue';
import InputDisplay from './components/InputDisplay.vue';
import ImageDisplay from './components/ImageDisplay.vue';

export default {
  name: 'App',
  components: {
    Explorer,
    InputDisplay,
    ImageDisplay
  }
}
</script>

<template>
  <div>

    <div class="header">
      <img src="@/assets/patch-explorer.svg" alt="Header Image saying Patch Explorer in pixels font" />
    </div>

    <Explorer class="explorer" position="absolute" style = "z-index: 1;"></Explorer>

    <div class="control-bar">
      <button @click="handleAction('Action 1')">Action 1</button>
      <button @click="handleAction('Action 2')">Action 2</button>
    </div>
    <ImageDisplay class="image-row" style="width: 256px; right: 0; height:256px;"></ImageDisplay>

  </div>
</template>

<style scoped>
#app {
  background-color: white;
}

.image-container {
  position: fixed;
  right: 0;
  display: flex;
  align-items: center;
  height: 100%;

}

.control-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #222;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.header {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
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
