
<script>

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';


export default {
    name: "InterventionDisplay",
    components: {
        Button,
        InputText,
        Dropdown,
    },
    
    props: {
        encoderValue: String,
        interventionType: String,
    },

    data() {
        return {
            sidebar_visible: true,
            selectedIntervention: null,
            interventions: [
                { name: 'Encoding', code: 'Encoding'},
                { name: 'Scaling', code: 'Scaling'}
            ]            
        };
    },
    methods: {
        toggle(){
            this.sidebar_visible = !this.sidebar_visible;
        }
    }

}</script>


<template>
     <div class="intervention-display" v-if="sidebar_visible"> 

        <div class="chooser">
            <Dropdown 
                v-model="selectedIntervention"
                :options="interventions" 
                optionLabel="name" 
                placeholder="Intervention"
                class="bla"
                @change="$emit('update:interventionType', selectedIntervention.code)"
            />
            
            <InputText
                type="text"
                :value="encoderValue"
                @input="$emit('update:encoderValue', $event.target.value)" 
            />
         </div>

     </div> 
     <!--
     <Button class="button" label="Interventions" severity="info" @click="sidebar_visible = !sidebar_visible" style="position:fixed;top:10px;left:20px;background-color:rgba(0, 255, 255, 1); color:black" /> 
    -->
</template>


<style>

.intervention-display {
    position: absolute;
    left: 0;
    height: 100vh;
    width: 250px;
    background-color: rgba(255, 255, 255, 0);
    flex-direction: column;
    align-items: center;
    display: flex;
}

.chooser {
    position: relative;
    left: 0;
    height: 100vh;
    width: 250px;
    background-color: rgba(255, 255, 255, 0);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    
}


</style>