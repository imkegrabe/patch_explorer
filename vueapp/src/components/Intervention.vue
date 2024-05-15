<template>
    <Panel header="{{ name }}" toggleable>
        <div v-for="(field, index) in fields">
            <span>{{ field.name }}</span>
            <InputText v-if="field.type === 'string'" v-model="field_values[index]"></InputText>
            <InputNumber v-else-if="field.type === 'float'" :minFractionDigits="2" :maxFractionDigits="5"
                v-model="field_values[index]"></InputNumber>
            <InputNumber v-else-if="field.type === 'integer'" v-model="field_values[index]"></InputNumber>
        </div>
    </Panel>
</template>

<style></style>

<script>

import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

export default {
    components: {
        Panel,
        InputText,
        InputNumber
    },
    props: {
        name: String,
        fields: Object
    },
    data() {
        return {
            field_values: []
        }
    },
    methods: {

    }

}
</script>
