
<script>

import Button from 'primevue/button';

export default {
    name: "InterventionDisplay",
    components: {
        Button,
    },

    data() {
        return {
            sidebar_visible: false,
            
        }
    },
    methods: {
        toggle(){
            this.sidebar_visible = !this.sidebar_visible;
        }
    }

}</script>


<template>
     <div class="intervention-display" v-if="sidebar_visible"> 
         <div >Hello</div> 
         
     </div> 
     <Button label="Menu" severity="info" @click="sidebar_visible = !sidebar_visible" style="position:fixed;top:10px;left:20px" /> 
     
</template>


<style>

    .intervention-display{
        position: absolute;
        height:100vh;
        width: 15%;
        background-color: white;
    }

</style>