<script>
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';

export default {
    name: 'Input',
    components: {
        Button,
        InputNumber,
        InputText
    },
    props: {
        host: String,
        interventions: Array,
        loading: Boolean,
        temp: Object,
        globalSelections: Array,
        encoderValue: String,
    },
    data() {
        return {
            prompt_value: "unicorn",
            seed_value: 93244,
        }
    },
    methods: {
        async generate() {
            const interventions_to_apply = []

            // for (const intervention of this.interventions) {

            //     for (const intervention_instance of intervention.instances) {

            //         const intervention_instance_to_apply = {
            //             name: intervention.name,
            //             args: Array.from(intervention_instance.field_values),
            //             modules: Array.from(intervention_instance.envoys)
            //         }

            //         interventions_to_apply.push(intervention_instance_to_apply)
            //     }
            // }

            // Replace this to work for all interventions - hardcoded to Scaling right now
//             const intervention_instance_to_apply = {
//             name: this.interventionType,
//             args: this.interventionType === 'scaling' 
//                 ? [parseFloat(this.encoderValue)]  // Parse as float if Scaling
//                 : [this.encoderValue],             // Use raw value otherwise
//             selections: this.globalSelections
// }
            let intervention_instance_to_apply;
            console.log('Current interventionType:', this.interventionType);

            if (this.interventionType === 'Scaling') {
                // If the intervention type is Scaling, parse encoderValue as a float
                intervention_instance_to_apply = {
                    name: 'Scaling',
                    args: [parseFloat(this.encoderValue)],  // Convert to float for Scaling
                    selections: this.globalSelections
                };
            } else {
                // Default to Encoder intervention type
                intervention_instance_to_apply = {
                    name: 'Encoder',
                    args: [this.encoderValue],  // Use raw encoderValue for Encoder
                    selections: this.globalSelections
                };
            }


            console.log(this.globalSelections)

            interventions_to_apply.push(intervention_instance_to_apply)

            const request = { prompt: this.prompt_value, seed: this.seed_value, interventions: interventions_to_apply }

            console.log(request)

            this.$emit('loading')

            let response

            response = await fetch(this.host + '/generate', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })

            //GENERATED IMAGE
            var image = await response.blob()
            
            var url = URL.createObjectURL(image);

            this.$emit('newImageUrl', url)

            //GENERATED ADDENDS

            console.log("requesting addends")
            response = await fetch(this.host + '/addends', {
                method: 'GET',

            })

            var addends = await response.json()
            console.log("addends spit out")

            this.$emit('newAddends', addends)
        }
    }
}
</script>



<template>
    <div class="input-container">

        <div class="prompt">
            <label>Prompt: </label>
            <InputText type="text" v-model="prompt_value" />
            <small></small>
        </div>

        <div class="seed">
            <label>Seed: </label>
            <InputNumber v-model="seed_value" inputId="integeronly" :step="1" :min="0"/>
            <small></small>
        </div>

        <div class="button-test">
            <Button class="button" label="Generate" @click="generate" :disabled="loading" style="background-color: rgb(0, 255, 0); color: black; margin: 5%; margin-left: 5%;"/>
        </div>

    </div>
</template>

<style>
.prompt {
    border-color: rgb(0, 255, 0);
}

.input-container {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    /* max-width: 600px; */
    
    color:rgb(0, 255, 0);
    bottom:5px;
    border-radius: 10px 10px 10px 10px;
    border-color: rgb(0, 255, 0);
    border-style: solid;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 2px;
}

</style>
