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
        showDropdownMessage() {
        
        const splitMsg = document.getElementById('split-image-message');
        if (splitMsg) splitMsg.remove();

        const existing = document.getElementById('dropdown-message');
        if (!existing) {
            const div = document.createElement('div');
            div.id = 'dropdown-message';
            div.innerHTML = 'Click on a patch grid to target intervention.<br> Then generate again.';
            div.style.position = 'fixed';
            div.style.bottom = '10px'; // So it sits above the SplitImage message
            div.style.left = '10px';
            div.style.background = 'rgba(0, 0, 0, 0)';
            div.style.color = 'rgb(0,255,0)';
            div.style.padding = '6px 10px';
            div.style.fontFamily = 'Courier, monospace';
            div.style.fontSize = '14px';
            div.style.borderRadius = '4px';
            div.style.zIndex = '9999';

            document.body.appendChild(div);

            setTimeout(() => {
                const el = document.getElementById('dropdown-message');
                if (el) el.remove();
            }, 3000);
        }
    },

    onInterventionChange() {
        this.$emit('update:interventionType', this.selectedIntervention.code);
        this.$emit('update:encoderValue', '');
        this.showDropdownMessage();  // Show message on dropdown change
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
    background-color: rgb(0, 0, 0) !important;
    color: rgb(0, 255, 0) !important;
    border: 1px solid rgb(0, 255, 0);
}

/* Text inside the dropdown label */
.dropdown .p-dropdown-label {
    color: rgb(0, 255, 0) !important; /* Light green */
}

.dropdown .p-dropdown-item {
    color: rgb(0, 255, 0) !important;
}

.args {
    width: 200px;
    background-color: rgba(255, 255, 255, 0) !important;
    color: rgb(0, 255, 0) !important;
    border: 1px solid rgb(0, 255, 0);
}

</style>