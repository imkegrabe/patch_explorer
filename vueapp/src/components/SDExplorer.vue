// HTML/MARKUP FOR CONTENT
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
            :loading="loading" 
            ></InputDisplay>

            <MainDisplay :loading="loading" :allGrids="allGrids"></MainDisplay>
            <ImageDisplay :loading="loading" :imageUrl="imageUrl" class="image-display"></ImageDisplay>
        </div>


        

        <!--<ModelDisplay :current_intervention_instance_applying="current_intervention_instance_applying"
            :modules="modules" @selectModule="selectModule"></ModelDisplay> -->

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

// JAVASCRIPT FOR DYNAMICS
<script>

import SidebarDisplay from './SidebarDisplay.vue';
// import ModelDisplay from './ModelDisplay.vue';
import ImageDisplay from './ImageDisplay.vue';
import InputDisplay from './InputDisplay.vue';
import MainDisplay from './MainDisplay.vue';
// import InterventionDisplay from './InterventionDisplay.vue';
import gridData from '@/assets/gridData.json';


export default {
    name: 'SDExplorer',
    props: {
        host: String
    },
    data() {
        return {
            loading: false,
            modules: {
                s1: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.0.attentions.0.transformer_blocks.0.attn1' },
                s2: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.0.attentions.1.transformer_blocks.0.attn1' },
                s3: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.1.attentions.0.transformer_blocks.0.attn1' },
                s4: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.1.attentions.1.transformer_blocks.0.attn1' },
                s5: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.2.attentions.0.transformer_blocks.0.attn1' },
                s6: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.2.attentions.1.transformer_blocks.0.attn1' },
                s7: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.mid_block.attentions.0.transformer_blocks.0.attn1' },
                s8: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.0.transformer_blocks.0.attn1' },
                s9: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.1.transformer_blocks.0.attn1' },
                s10: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.2.transformer_blocks.0.attn1' },
                s11: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.0.transformer_blocks.0.attn1' },
                s12: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.1.transformer_blocks.0.attn1' },
                s13: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.2.transformer_blocks.0.attn1' },
                s14: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.0.transformer_blocks.0.attn1' },
                s15: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.1.transformer_blocks.0.attn1' },
                s16: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.2.transformer_blocks.0.attn1' },
                c1: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.0.attentions.0.transformer_blocks.0.attn2' },
                c2: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.0.attentions.1.transformer_blocks.0.attn2' },
                c3: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.1.attentions.0.transformer_blocks.0.attn2' },
                c4: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.1.attentions.1.transformer_blocks.0.attn2' },
                c5: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.2.attentions.0.transformer_blocks.0.attn2' },
                c6: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.2.attentions.1.transformer_blocks.0.attn2' },
                c7: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.mid_block.attentions.0.transformer_blocks.0.attn2' },
                c8: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.0.transformer_blocks.0.attn2' },
                c9: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.1.transformer_blocks.0.attn2' },
                c10: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.2.transformer_blocks.0.attn2' },
                c11: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.0.transformer_blocks.0.attn2' },
                c12: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.1.transformer_blocks.0.attn2' },
                c13: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.2.transformer_blocks.0.attn2' },
                c14: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.0.transformer_blocks.0.attn2' },
                c15: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.1.transformer_blocks.0.attn2' },
                c16: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.2.transformer_blocks.0.attn2' }
            },
            imageUrl: require('@/assets/hidden-unicorn.png'),
            allGrids: gridData,
            interventions: [],
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
    // InterventionDisplay,
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
                    this.interventions = response.interventions;
                    this.architecture = response.architecture;
                })
        }

    },

    mounted() {
        this.init()
    },
}

</script>




// CSS FOR STYLING
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