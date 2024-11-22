<template>
    <div class="header">Patch Explorer</div>
    <div class="main-container">
        
        
        <div class="content-container">
            <InputDisplay 
            @loading="loading = true" 
            @updateImage="(url) => updateImage(url)" 
            @updateAddends="(addends) => updateAddends(addends)" 
            :host="host"
            :interventions="interventions" 
            :temp="temp"
            :loading="loading" 
            ></InputDisplay>

            <MainDisplay 
            :loading="loading" 
            :allGrids="allGrids"
            :current_intervention_instance_applying="current_intervention_instance_applying"
            @module-draw="(module_idx, grid_idx, patches) =>handleModuleDraw(module_idx, grid_idx, patches)"
            ></MainDisplay>

            <ImageDisplay 
            :loading="loading" 
            :imageUrl="imageUrl" 
            class="image-display"
            ></ImageDisplay>
        </div>        

    </div>

    <div class="bottom-container">
        <SidebarDisplay
            @updateInterventionInstance="(ii) => current_intervention_instance_applying = ii"
            :current_intervention_instance_applying="current_intervention_instance_applying"
            :interventions="interventions"></SidebarDisplay>
            <!-- <InterventionDisplay v-for="intervention in interventions" :key="'intervention_' + intervention.name"
                    :intervention="intervention"
                    :current_intervention_instance_applying="current_intervention_instance_applying"
                    @updateInterventionInstance="(ii) => $emit('updateInterventionInstance', ii)"
                    @addInterventionInstance="addInterventionInstance" /> -->
    </div>
</template>


<script>

import SidebarDisplay from './SidebarDisplay.vue';
// import ModelDisplay from './ModelDisplay.vue';
import ImageDisplay from './ImageDisplay.vue';
import InputDisplay from './InputDisplay.vue';
import MainDisplay from './MainDisplay.vue';
import gridData from '@/assets/gridData.json';


export default {
    name: 'SDExplorer',
    props: {
        host: String
    },
    data() {
        return {
            loading: false,
            imageUrl: require('@/assets/hidden-unicorn.png'),
            allGrids: gridData,
            interventions: [],
            // Replace temp
            temp: {},
            architecture: {},
            current_intervention_instance_applying: null
        };

    },
    components: {
    SidebarDisplay,
    ImageDisplay,
    // ModelDisplay,
    InputDisplay,
    MainDisplay,
    },
    methods: {
        updateImage(url) {
            this.imageUrl = url;
            this.loading = false;
        },
        updateAddends(addends) {
            this.allGrids = addends
        },
        selectModule(module_key) {
            if (this.current_intervention_instance_applying !== null) {
                this.modules[module_key].isClicked = !this.modules[module_key].isClicked;
                if (this.modules[module_key].isClicked) {
                    this.modules[module_key].color = this.current_intervention_instance_applying.color;
                    this.current_intervention_instance_applying.envoys.add(this.modules[module_key].name) //adds module name - want indices instead
                }
                else {
                    for (const intervention of this.interventions) {
                        for (const intervention_instance of intervention.instances) {
                            intervention_instance.envoys.delete(this.modules[module_key].name)
                        }
                    }

                    this.current_intervention_instance_applying.envoys.delete(this.modules[module_key].name)

                }

            }
        },
        init() {
            console.log(this.allGrids)
            fetch(this.host + '/init', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })
                .then(response => { return response.json() })
                .then(response => {
                    this.interventions = response.interventions; //updates interventions + architecture
                    this.architecture = response.architecture;
                })
        },
        handleModuleDraw(module_idx, grid_idx, patches) {
            console.log(`module draw registered, emitting dict:`);

            if (!(module_idx in this.temp)){
                this.temp[module_idx] = {}
            }

            this.temp[module_idx][grid_idx] = Array.from(patches)
            
            console.log(this.temp)

        }

    },

    mounted() {
        this.init()
    },
}

</script>



<style scoped>

.header {
    display: flex;
    justify-content: flex-start;
    align-items: left;
    justify-content: top;
    padding: 0px;
    top: 0px;
    font-size: 75px;
    color: rgb(43, 255, 43);
}
.main-container {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left; 
}

.content-container {
    position: relative;
    display: flex;
    justify-content: left;
    align-items: center;
}
/* 
.content-container > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
} */

.bottom-container {
    display: flex;
    flex-direction: row;
    bottom: 0;
    left: 0;
    /* background-color: rgb(233, 233, 233); */
    border-color: rgb(43, 255, 43);
    border-style: solid;
    border-top-width: 2px;
    border-right-width: 2px;
    border-left-width: 2px;
}
</style>