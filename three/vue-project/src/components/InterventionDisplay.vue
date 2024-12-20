
<script>

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

export default {
    name: "InterventionDisplay",
    components: {
        Button,
        InputText
    },
    
    props: {
        encoderValue: String,
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
        <div class="encoding">
            <label>Encoding: </label>
            <InputText
                type="text"
                :value="encoderValue"
                @input="$emit('update:encoderValue', $event.target.value)" 
            />
            <small></small>
        </div>
         
     </div> 

     <Button class="button" label="Interventions" severity="info" @click="sidebar_visible = !sidebar_visible" style="position:fixed;top:10px;left:20px;background-color:rgba(0, 255, 255, 1); color:black" /> 
     
</template>


<style>

    .intervention-display{
        position: absolute;
        height:100vh;
        width: 15%;
        background-color: rgba(255, 255, 255, 0);
        flex-direction: column;
        align-items: center;
        display: flex;
        flex-direction: row;
    }

</style>