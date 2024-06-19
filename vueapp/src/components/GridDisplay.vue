<template>
    <div class="grid" >
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="grid-row">
        <div
          v-for="(patch, patchIndex) in row"
          :key="patchIndex"
          class="patch"
          :style="{ backgroundColor: getColor(patch) }"
          @click="handleClick(rowIndex, patchIndex)"
        >
        </div>
      </div>
    </div>
  </template>
  



  <script>

  export default {

    props:  {
      // the grid data probs
      grid: {
        type: Array,
        required: true
      },
      clickedPatches: {
        type: Array,
        required: true
      }
    },
    
    methods: {
      
      getColor(value) {
        // the color function
        
        // If patch clicked - add some transparent layer?
        // if (this.clickedPatchs[rowIndex][patchIndex]) {
        //   return 'rgb(255, 0, 0)';
        // }
        const cmapCool = (x) => {
          const r = Math.floor(255 * x);
          const g = Math.floor(255 * (1 - x));
          const b = 255;
        return `rgb(${r}, ${g}, ${b})`;
        };
        return cmapCool(value);
      
      },

      handleClick(rowIndex, patchIndex) {
        this.$emit('patch-click', { rowIndex, patchIndex})
      }
    }
  };
  
  </script>
  


  
  <style>
  /* style for grid row */
  .grid {
    padding: 1px;
  }

  .grid-row {
    display: flex;
  }
  
  /* style for patch */
  .patch {
    width: 1px; /* Adjust the size as needed */
    height: 1px; /* Adjust the size as needed */
  }
  </style>
  