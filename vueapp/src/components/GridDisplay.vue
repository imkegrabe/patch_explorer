<template>
    <div class="grid" >
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="grid-row">
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="grid-cell"
          :style="{ backgroundColor: getColor(cell) }"
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
      }
    },
    
    methods: {
      
      getColor(value) {
        // the color function
        const cmapCool = (x) => {
          const r = Math.floor(255 * x);
          const g = Math.floor(255 * (1 - x));
          const b = 255;
        return `rgb(${r}, ${g}, ${b})`;
        };
        return cmapCool(value);
      
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
  
  /* style for grid cell */
  .grid-cell {
    width: 1px; /* Adjust the size as needed */
    height: 1px; /* Adjust the size as needed */
  }
  </style>
  