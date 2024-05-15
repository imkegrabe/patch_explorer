<template>
    <Sidebar :visible="sidebar_visible" header="Menu">
        <Panel header="Interventions" toggleable>
            <Intervention v-for="intervention in interventions" :name="intervention.name" :fields="intervention.fields">
            </Intervention>
        </Panel>
    </Sidebar>
    <Button label="Menu" @click="sidebar_visible = true" style="position:sticky;top:20px;left:20px" />
</template>
<style></style>
<script>

import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Sidebar from 'primevue/sidebar';
import Intervention from './Intervention.vue';

export default {
    components: {
        Sidebar,
        Button,
        Panel,
        Intervention
    },
    props: {
        interventions: Array
    },
    data() {
        return {

        }
    },
    methods: {

    }

}</script>
