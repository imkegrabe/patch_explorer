<template>
    <Panel>
        <template #header>
            <div class="intervention-header">
                <span class="font-bold">{{ intervention.name }}</span>
                <Button label="Add" @click="createInterventionInstance"></Button>
            </div>
        </template>
        <Panel v-for="(intervention_instance, intervention_instance_index) in intervention.instances"
            :key="'intervention_instance_' + intervention_instance_index">
            <template #header>
                <div class="intervention-instance-header">
                    <span class="font-bold">{{ intervention_instance.name }}</span>
                    <ColorPicker v-model="intervention_instance.color"></ColorPicker>
                    <Button
                        :label="intervention_instance.name === current_intervention_instance_applying?.name ? 'Applying' : 'Apply'"
                        @click="applyIntervention(intervention_instance)"
                        :disabled="intervention_instance.name === current_intervention_instance_applying?.name"></Button>
                </div>
            </template>
            <div v-for="(field, field_index) in intervention.fields"
                :key="'field_' + intervention_instance_index + '_' + field_index">
                <span>{{ field.name }}</span>
                <InputText v-if="field.type === 'string'" v-model="intervention_instance.field_values[field_index]">
                </InputText>
                <InputNumber v-else-if="field.type === 'float'" :minFractionDigits="2" :maxFractionDigits="5"
                    v-model="intervention_instance.field_values[field_index]"></InputNumber>
                <InputNumber v-else-if="field.type === 'integer'" v-model="intervention_instance.field_values[field_index]">
                </InputNumber>
            </div>
        </Panel>
    </Panel>
</template>

<style>
.intervention-header, .intervention-instance-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>

<script>

import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import ColorPicker from 'primevue/colorpicker';


export default {
    name: "InterventionDisplay",
    components: {
        Panel,
        InputText,
        InputNumber,
        Button,
        ColorPicker
    },
    props: {
        intervention: Object,
        current_intervention_instance_applying: Object
    },
    data() {
        return {
        }
    },
    methods: {
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },

        createInterventionInstance() {
            let intervention_instance = {
                name: this.intervention.name + ' ' + this.intervention.num_instances,
                field_values: Array(this.intervention.fields.length),
                color: this.getRandomColor(),
                envoys: new Set([])
            }

            this.$emit('addInterventionInstance', intervention_instance, this.intervention)


        },
        applyIntervention(intervention_instance) {
            this.$emit('updateInterventionInstance', intervention_instance)
        }
    }

}
</script>
