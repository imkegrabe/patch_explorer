<script>
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'

export default {
  name: 'ImageDisplay',
  components: {
    Skeleton,
    Button,
  },
  props: {
    imageUrl: String,
    loading: Boolean,
  },
  data() {
    return {
      imagebar_visible: true,
      imageLoaded: false,
    }
  },
  watch: {
    imageUrl(newVal) {
      // Reset state when new image URL arrives
      if (newVal) this.imageLoaded = false
    },
  },
  methods: {
    toggle() {
      this.imagebar_visible = !this.imagebar_visible
    },
    onImageLoad() {
      console.log('✅ Image loaded successfully!')
      this.imageLoaded = true
    },
    onImageError() {
      console.error('❌ Image failed to load!')
      this.imageLoaded = false
    },
  },
}
</script>

<template>
  <!-- <div class="imagebar" v-if="imagebar_visible"> -->
    <div class="image-container">
      <!-- Skeleton while loading -->
      <Skeleton v-if="loading && !imageLoaded" class="loading" />

      <!-- Fallback if no image URL -->
      <div v-else-if="!imageUrl" class="image-fallback">
        Start by generating an image.
      </div>

      <!-- Always render the image when a URL exists -->
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="Generated image"
        @load="onImageLoad"
        @error="onImageError"
        :style="{ display: imageLoaded ? 'block' : 'none' }"
      />
    <!-- </div> -->
  </div>

  <!-- Optional toggle button -->
  <!--
  <Button
    class="imagebutton"
    label="<"
    severity="info"
    @click="toggle"
  />
  -->
</template>

<style>
.imagebar {
  padding: 10px;
  align-items: center;
}

.image-container {
  right: 15px;
  padding: 0px;
  position: relative;
  width: 256px;
  height: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  overflow: hidden;
  box-shadow: 0 0 15px 3px rgba(0, 255, 0, 0.5); /* soft green glow */
  border: none;
  border-radius: 8px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
  transition: opacity 0.4s ease;
  opacity: 0;
}

/* Smoothly fade image in when loaded */
.image-container img[style*="display: block"] {
  opacity: 1;
}

.image-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(0, 255, 0);
  background-color: rgba(0, 0, 0, 0.85);
  font-family: monospace;
  font-size: 1rem;
  text-align: center;
  padding: 10px;
}

.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 0;
}

.imagebutton {
  position: fixed;
  right: 0px;
  border-color: rgb(0, 255, 0) !important;
  background-color: rgb(0, 255, 0) !important;
  color: black !important;
  font-weight: bold;
  cursor: pointer;
}
</style>
