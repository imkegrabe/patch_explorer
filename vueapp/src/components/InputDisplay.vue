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
            <Button label="Generate" @click="generate" :disabled="loading" />
        </div>

    </div>

</template>
<style>
.input-container {
    position: fixed;
    bottom: 0px;
    width: 90%;
    display: flex;
    flex-direction: row !important;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: rgb(233, 233, 233);
    border-color: grey;
    border-style: solid;
    border-top-width: 5px;
    border-right-width: 5px;
    border-left-width: 5px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;

    margin:0px !important;

    height:10%;
}
</style>
<script>
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';

export default {
    name: 'InputDisplay',
    components: {
        Button,
        InputNumber,
        InputText
    },
    props: {
        host: String,
        modules: Object,
        loading: Boolean
    },
    data() {
        return {
            prompt_value: "unicorn",
            seed_value: 79,
        }
    },
    methods: {
        generate() {
            const cross_modules = []
            const self_modules = []
            for (const [key, value] of Object.entries(this.modules)) {
                if (value.isClicked) {
                    if (key[0] == "c") {
                        cross_modules.push(value.name)
                    }
                    else {
                        self_modules.push(value.name)
                    }
                }
            }
            const cross_intervention = { name: "ablate.AblationIntervention", args: [], modules: cross_modules }
            const self_intervention = { name: "ablate.AblationIntervention", args: [], modules: self_modules }
            const request = { prompt: this.prompt_value, seed: this.seed_value, interventions: [cross_intervention, self_intervention] }
            
            this.$emit('loading')

            fetch(this.host + '/generate', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
          
            }).then(res => { return res.blob() })
                .then(blob => {
                    var img = URL.createObjectURL(blob);

                    this.$emit('updateImage', img)

                })
        }
    }

}
</script>
