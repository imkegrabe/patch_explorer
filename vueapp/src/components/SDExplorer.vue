// HTML/MARKUP FOR CONTENT
<template>
    <div class="main-container">

        <InputDisplay :imageUrl="imageUrl" :host="host"></InputDisplay>


        <ModelDisplay :modules="modules"></ModelDisplay>

        <ImageDisplay :imageUrl="imageUrl"></ImageDisplay>

        <SidebarDisplay :interventions="interventions"></SidebarDisplay>



    </div>

</template>

// CSS FOR STYLING
<style scoped>
:root {
    /* --scale: 1; */
    /* --dim1: calc(64 * var(--scale))px;
    --dim2: calc(32px * var(--scale));
    --dim3: calc(16px * var(--scale));
    --dim4: calc(8px * var(--scale)); */
}

/* .container{
    display: flex;
    justify-content: flex-between;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px + 4px);
    height: calc(64px + 32px + 16px + 8px + 4px);
} */
.main-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}


.button-test {
    width: 200px;
    height: 50px;
}
</style>



// JAVASCRIPT FOR DYNAMICS
<script>

import SidebarDisplay from './SidebarDisplay.vue';
import ModelDisplay from './ModelDisplay.vue';
import ImageDisplay from './ImageDisplay.vue';
import InputDisplay from './InputDisplay.vue';

export default {
    name: 'SDExplorer',
    props: {
        host: String
    },
    data() {
        return {

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
            interventions: {},
            architecture: {}
        };

    },
    components: {
        SidebarDisplay,
        ImageDisplay,
        ModelDisplay,
        InputDisplay

    },
    methods: {
        init() {
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