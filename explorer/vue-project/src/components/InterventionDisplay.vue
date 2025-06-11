<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { computed } from 'vue';

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

    computed: {
        inputPlaceholder() {
            if (!this.selectedIntervention) return '';
            return this.selectedIntervention.code === 'Encoding' ? 'alternative prompt' : 'factor';
        }
    },

    methods: {
        toggle() {
            this.sidebar_visible = !this.sidebar_visible;
        },
        onInterventionChange() {
            this.$emit('update:interventionType', this.selectedIntervention.code);
            this.$emit('update:encoderValue', '');
        }
    }
}
</script>

<template>
     <div class="intervention-display" v-if="sidebar_visible"> 

        <div class="chooser" :style="{ color: 'limegreen' }">
            <Dropdown 
                v-model="selectedIntervention"
                :options="interventions" 
                optionLabel="name" 
                placeholder="Intervention"
                class="dropdown"
                @change="onInterventionChange"
            />
            
            <InputText
                type="text"
                class="args"
                :placeholder="inputPlaceholder"
                :value="encoderValue"
                @input="$emit('update:encoderValue', $event.target.value)" 
            />
         </div>

     </div> 
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
    background-color: rgba(157, 31, 31, 0);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
}

.dropdown {
    width: 200px;
    background-color: black;
}

.dropdown .p-dropdown-label {
    color: limegreen !important;
}

.p-dropdown-item {
    color: limegreen !important;
}

.args {
    width: 200px;
}
</style>