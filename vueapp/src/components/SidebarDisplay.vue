<template>
    <!-- <div id="sidebar-container"> -->
        <!-- <Sidebar v-model:visible="sidebar_visible" header="Menu" style="width:fit-content;"> -->
            <Panel class="intervention-bar" header="Interventions" toggleable>
                <InterventionDisplay class="intervention-intance" v-for="intervention in interventions" :key="'intervention_' + intervention.name"
                    :intervention="intervention"
                    :current_intervention_instance_applying="current_intervention_instance_applying"
                    @updateInterventionInstance="(ii) => $emit('updateInterventionInstance', ii)"
                    @addInterventionInstance="addInterventionInstance" />

            </Panel>
        <!-- </Sidebar> -->
        <!-- <Button label="Menu" @click="sidebar_visible = true" style="position:fixed;top:10px;left:20px" /> -->
    <!-- </div> -->
</template>

<script>

// import Button from 'primevue/button';
import Panel from 'primevue/panel';
// import Sidebar from 'primevue/sidebar';
import InterventionDisplay from './InterventionDisplay.vue';

export default {
    name: "SidebarDisplay",
    components: {
        // Sidebar,
        // Button,
        Panel,
        InterventionDisplay
    },
    props: {
        interventions: Array,
        current_intervention_instance_applying: Object
    },
    data() {
        return {
            sidebar_visible: false,
            
        }
    },
    methods: {
        addInterventionInstance(instance, intervention){
            intervention.instances.push(instance)

            intervention.num_instances += 1;
        }
    }

}</script>

<style>

</style>