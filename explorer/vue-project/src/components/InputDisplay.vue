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
             start_step:"0",
        end_step: "50"
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

            const request = { prompt: this.prompt_value, seed: this.seed_value, interventions: interventions_to_apply, start_step:this.start_step, end_step:this.end_step }

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
            <InputNumber v-model="seed_value" inputId="integeronly" :step="1" :min="0" />
            <small></small>
        </div>

        <div class="button-test">
            <Button class="button" label="Generate" @click="generate" :disabled="loading"
                style="background-color: rgb(0, 255, 255); color: black; margin: 5%; margin-left: 5%;" />
        </div>

        <div class="timestep-container">
            <!-- <SelectButton id="view-selection" v-model="value" :options="options" />
        <Slider v-model="value" id="timestep-slider" range orientation="vertical" style="position: fixed; bottom: 200px; left: 10%; color: white;"/> -->

            <input type="range"  id="near-slider" v-model="start_step" min="0" max="50" step="1" value="0"
                style="position: fixed; bottom: 200px; left: 3%; transform: translateX(-50%) rotate(-90deg);">
            <span id="near-value"
                style="position: fixed; bottom: 200px; left: 4%; transform: translateX(-50%);">{{ start_step }}</span>

            <input type="range" id="far-slider" v-model="end_step" min="0" max="50" step="1" value="50"
                style="position: fixed; bottom: 200px; left: 5%; transform: translateX(-50%) rotate(-90deg);">
            <span id="far-value" style="position: fixed; bottom: 200px; left: 6%; transform: translateX(-50%);">{{ end_step }}</span>
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
    color: white;
    bottom: 0;
    /* background-color: rgba(0, 255, 255, 1); */
    border-radius: 15px 15px 0px 0px;
    border-color: white;
    border-style: solid;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
