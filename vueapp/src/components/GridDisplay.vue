<template>
  <div class="grid" @keydown="handleKeyDown" @keyup="handleKeyUp" tabindex="0">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="grid-row">
      <div
        v-for="(patch, patchIndex) in row"
        :key="patchIndex"
        class="patch"
        :style="{ backgroundColor: getColor(patch) }"
        @mouseover="handleMouseOver(rowIndex, patchIndex)"
      >
        <div v-if="isPainted(rowIndex, patchIndex)" class="overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // the grid data probs
    grid: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isPainting: false,
      paintedPatches: new Set(),
    };
  },

  methods: {
    getColor(value) {
      const cmapCool = (x) => {
        const r = Math.floor(255 * x);
        const g = Math.floor(255 * (1 - x));
        const b = 255;
        const a = 0.9;
        return `rgb(${r}, ${g}, ${b}, ${a})`;
      };
      return cmapCool(value);
    },

    handleKeyDown(event) {
      if (event.key === "d") {
        this.isPainting = true;
        console.log("I pressed D");
      }
    },

    handleKeyUp(event) {
      if (event.key === "d") {
        this.isPainting = false;
      }
    },

    handleMouseOver(rowIndex, patchIndex) {
      if (this.isPainting) {
        const patchKey = `${rowIndex}-${patchIndex}`;
        this.paintedPatches.add(patchKey);
        this.$forceUpdate();
      }
    },

    isPainted(rowIndex, patchIndex) {
      const patchKey = `${rowIndex}-${patchIndex}`;
      return this.paintedPatches.has(patchKey);
    },
  },
};
</script>

<style>
.grid {
  padding: 1px;
  cursor: pointer;
}

.grid-row {
  display: flex;
}

.patch {
  width: 1px;
  height: 1px;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(19, 255, 29, 0.75);
  pointer-events: none;
}
</style>
