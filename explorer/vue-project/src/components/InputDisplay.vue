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
            seed_value: 79,
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
            const intervention_instance_to_apply = {
                name: 'Encoder',
                args: [this.encoderValue],
                selections: this.globalSelections
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

            response = await fetch(this.host + '/addends', {
                method: 'GET',

            })

            var addends = await response.json()

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
            <Button class="button" label="Generate" @click="generate" :disabled="loading" style="background-color: rgb(0, 255, 255); color: black; margin: 5%; margin-left: 5%;"/>
        </div>

    </div>
</template>

<style>
.input-container {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    /* height: 7%; */
    /* width:45%; */
    margin-left: 30%;
    color:white;
    bottom:0;
    /* background-color: rgba(0, 255, 255, 1); */
    border-radius: 15px 15px 0px 0px;
    border-color: white;
    border-style: solid;
    padding-left: 10px;
    padding-right: 10px;
}

</style>
