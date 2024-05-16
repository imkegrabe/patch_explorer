<template>
    <div id="sidebar-container">
        <Sidebar v-model:visible="sidebar_visible" header="Menu" style="width:fit-content;">
            <Panel header="Interventions" toggleable>
                <InterventionDisplay v-for="intervention in interventions" :key="'intervention_' + intervention.name"
                    :name="intervention.name" :fields="intervention.fields" />

            </Panel>
        </Sidebar>
        <Button label="Menu" @click="sidebar_visible = true" style="position:fixed;top:10px;left:20px" />
    </div>
</template>
<style>
.p-sidebar-mask {
    width: 0% !important
}
</style>
<script>

import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Sidebar from 'primevue/sidebar';
import InterventionDisplay from './InterventionDisplay.vue';

export default {
    name: "SidebarDisplay",
    components: {
        Sidebar,
        Button,
        Panel,
        InterventionDisplay
    },
    props: {
        interventions: Array
    },
    data() {
        return {
            sidebar_visible: false
        }
    },
    methods: {

    }

}</script>
