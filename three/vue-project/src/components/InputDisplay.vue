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
        temp: Object
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

            // Replace this to work for all interventions - hardcoded to scaling right now
            const intervention_instance_to_apply = {
                name: 'Scaling',
                args: [0.0],
                selections: this.temp
            }

            // interventions_to_apply.push(intervention_instance_to_apply)

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
            <label>Prompt:</label>
            <InputText type="text" v-model="prompt_value" />
            <small></small>
        </div>

        <div class="seed">
            <label>Seed: </label>
            <InputNumber v-model="seed_value" inputId="integeronly" />
            <small></small>
        </div>

        <div class="button-test">
            <Button class="button" label="Generate" @click="generate" :disabled="loading" />
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
    height: 5%;
    width:30%;
    margin-left: 35%;
    color:black;
    bottom:0;
    background-color: grey;
    border-radius: 25px 25px 0px 0px;
}

</style>
