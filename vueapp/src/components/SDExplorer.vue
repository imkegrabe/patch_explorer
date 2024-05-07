// HTML/MARKUP FOR CONTENT
<template>

    <div class="container">

        <div class ="cross-attn-viz"> 
            <div class="level-1-row">
                <div class="down-1">
                    
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.c1.isClicked ? modules.c1.color : modules.c1.defaultColor }"
                    @click="toggleColor('c1')"
                    > 1 </div>    
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.c2.isClicked ? modules.c2.color : modules.c2.defaultColor }"
                    @click="toggleColor('c2')"
                    > 2 </div>          

                </div>
                <div class="up-3">
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.c14.isClicked ? modules.c14.color : modules.c14.defaultColor }"
                    @click="toggleColor('c14')"
                    > 14 </div>
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.c15.isClicked ? modules.c15.color : modules.c15.defaultColor }"
                    @click="toggleColor('c15')"
                    > 15 </div>
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.c16.isClicked ? modules.c16.color : modules.c16.defaultColor }"
                    @click="toggleColor('c16')"
                    > 14 </div>
                </div>
            </div>
            
            <div class="level-2-row">
                <div class="down-2">
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.c3.isClicked ? modules.c3.color : modules.c3.defaultColor }"
                    @click="toggleColor('c3')"
                    > 3</div>
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.c4.isClicked ? modules.c4.color : modules.c4.defaultColor }"
                    @click="toggleColor('c4')"
                    > 4</div>
                </div>
                <div class="up-2">
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.c11.isClicked ? modules.c11.color : modules.c11.defaultColor }"
                    @click="toggleColor('c11')"
                    > 11</div>
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.c12.isClicked ? modules.c12.color : modules.c12.defaultColor }"
                    @click="toggleColor('c12')"
                    > 12</div>
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.c13.isClicked ? modules.c13.color : modules.c13.defaultColor }"
                    @click="toggleColor('c13')"
                    > 13</div>
                </div>
            </div>
            
            <div class="level-3-row">
                <div class="down-3">
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.c5.isClicked ? modules.c5.color : modules.c5.defaultColor }"
                    @click="toggleColor('c5')"
                    > 5 </div>
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.c6.isClicked ? modules.c6.color : modules.c6.defaultColor }"
                    @click="toggleColor('c6')"
                    >  6 </div>
                </div>
                <div class="up-1">
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.c8.isClicked ? modules.c8.color : modules.c8.defaultColor }"
                    @click="toggleColor('c8')"
                    > 8 </div>
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.c9.isClicked ? modules.c9.color : modules.c9.defaultColor }"
                    @click="toggleColor('c9')"
                    > 9 </div>
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.c10.isClicked ? modules.c10.color : modules.c10.defaultColor }"
                    @click="toggleColor('c10')"
                    > 10 </div>
                </div>
            </div>
            
            <div class="level-4-row">
                <div class="mid">
                    <div class="level-4-rec"
                    :style= " {backgroundColor: modules.c7.isClicked ? modules.c7.color : modules.c7.defaultColor }"
                    @click="toggleColor('c7')"
                    > 7 </div>
                </div>
            </div>
        </div>

        <div class ="self-attn-viz">
            
            <div class="level-1-row">
                <div class="down-1">
                    
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.s1.isClicked ? modules.s1.color : modules.s1.defaultColor }"
                    @click="toggleColor('s1')"
                    > 1 </div>    
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.s2.isClicked ? modules.s2.color : modules.s2.defaultColor }"
                    @click="toggleColor('s2')"
                    > 2 </div>          

                </div>
                <div class="up-3">
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.s14.isClicked ? modules.s14.color : modules.s14.defaultColor }"
                    @click="toggleColor('s14')"
                    > 14 </div>
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.s15.isClicked ? modules.s15.color : modules.s15.defaultColor }"
                    @click="toggleColor('s15')"
                    > 15 </div>
                    <div class="level-1-rec"
                    :style= " {backgroundColor: modules.s16.isClicked ? modules.s16.color : modules.s16.defaultColor }"
                    @click="toggleColor('s16')"
                    > 14 </div>
                </div>
            </div>
            
            <div class="level-2-row">
                <div class="down-2">
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.s3.isClicked ? modules.s3.color : modules.s3.defaultColor }"
                    @click="toggleColor('s3')"
                    > 3</div>
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.s4.isClicked ? modules.s4.color : modules.s4.defaultColor }"
                    @click="toggleColor('s4')"
                    > 4</div>
                </div>
                <div class="up-2">
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.s11.isClicked ? modules.s11.color : modules.s11.defaultColor }"
                    @click="toggleColor('s11')"
                    > 11</div>
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.s12.isClicked ? modules.s12.color : modules.s12.defaultColor }"
                    @click="toggleColor('s12')"
                    > 12</div>
                    <div class="level-2-rec"
                    :style= " {backgroundColor: modules.s13.isClicked ? modules.s13.color : modules.s13.defaultColor }"
                    @click="toggleColor('s13')"
                    > 13</div>
                </div>
            </div>
            
            <div class="level-3-row">
                <div class="down-3">
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.s5.isClicked ? modules.s5.color : modules.s5.defaultColor }"
                    @click="toggleColor('s5')"
                    > 5 </div>
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.s6.isClicked ? modules.s6.color : modules.s6.defaultColor }"
                    @click="toggleColor('s6')"
                    >  6 </div>
                </div>
                <div class="up-1">
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.s8.isClicked ? modules.s8.color : modules.s8.defaultColor }"
                    @click="toggleColor('s8')"
                    > 8 </div>
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.s9.isClicked ? modules.s9.color : modules.s9.defaultColor }"
                    @click="toggleColor('s9')"
                    > 9 </div>
                    <div class="level-3-rec"
                    :style= " {backgroundColor: modules.s10.isClicked ? modules.s10.color : modules.s10.defaultColor }"
                    @click="toggleColor('s10')"
                    > 10 </div>
                </div>
            </div>
            <div class="level-4-row">
                <div class="mid">
                    <div class="level-4-rec"
                    :style= " {backgroundColor: modules.s7.isClicked ? modules.s7.color : modules.s7.defaultColor }"
                    @click="toggleColor('s7')"
                    > 7 </div>
                </div>
            </div>
            
        </div>
    </div>
    <div class="image-container">

    </div>

    <div class="input-row">
        <label >Prompt</label>
        <InputText type="text" v-model="prompt_value" />
        <small>Provide a prompt pls.</small>

        <label >Seed</label>
        <InputNumber v-model="seed_value" />
        <small>Give a seed.</small>
    </div>

    <div class="button-test">
        <Button label="Generate" @click="generate" />
    </div>

</template>

// CSS FOR STYLING
<style scoped>
:root{
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

.big-row{
    display: flex;
    justify-content: flex-between;
    width: calc(5680px + 4400px);
    height: 4400px;
}.image-container{
    display: flex;
    justify-content: flex-between;
    width: 40px;
    height: 40px;
}
.cross-attn-viz {
    display: flex;
    flex-direction: column;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
    height: calc(64px + 32px + 16px + 8px);
    font-size: 6px;
    position: relative;
    /* left: 4px;
    top: 4px; */
}
.self-attn-viz {
    display: flex;
    flex-direction: column;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
    height: calc(64px + 32px + 16px + 8px);
    font-size: 6px;
    position: relative;
}

.input_row{
    height: 10px;
    align-items: left;
}
.level-1-row{
    display: flex;
    flex-direction: row;
    height: 64px;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
    height: 64px;
}
.level-2-row{
    display: flex;
    flex-direction: row;
    height: 32px;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
}
.level-3-row{
    display: flex;
    flex-direction: row;
    height: 16px;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
}
.level-4-row{
    display: flex;
    flex-direction: row;
    height: 8px;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
}


.down-1{
    display: flex;
    flex-direction: row;
    width: calc(64px*2);
    height: 64px;
}
.down-2{
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2);
    width: calc(32px*2);
    height: 32px;
}
.down-3{
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2 + 32px*2);
    width: calc(16px*2);
    height: 16px;
}
.mid{
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2 + 32px*2 + 16px*2);
    width: 8px;
    height: 8px;
}
.up-1{
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2 + 32px*2 + 8px);
    width: calc(16px*3);
    height: 16px;
}
.up-2{
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2 + 16px*2 + 8px + 16px*3);
    width: calc(32px*3);
    height: 32px;
}
.up-3{
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(32px*2 + 16px*2 + 8px + 16px*3 + 32px*3);
    width: calc(64px*3);
    height: 64px;
}


.level-1-rec{
    width: 64px;
    height: 64px;
    padding: 4px;
    border: 1px dashed #13FF1D;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
}
/* .level-1-rec:hover {
    background-color: lightcoral;
} */

.level-2-rec{
    width: 32px;
    height: 32px;
    border: 1px dashed #13FF1D;
    display: flex;
    justify-content: center;
    align-items: center;
}
.level-3-rec{
    width: 16px;
    height: 16px;
    border: 1px dashed #13FF1D;
    display: flex;
    justify-content: center;
    align-items: center;
}
.level-4-rec{
    width: 8px;
    height: 8px;
    border: 1px dashed #13FF1D;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-test{
    width: 200px; 
    height: 50px;
    }
</style>



// JAVASCRIPT FOR DYNAMICS
<script>

//import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

export default {
    name: 'SDExplorer',
    props: {
        msg: String
    },
    data() {
        return {
            prompt_value: "default",
            seed_value: 40,
            value: '',  // Initialize 'value' with an empty string or appropriate initial value
            modules: {
            c1: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.0.attentions.0.transformer_blocks.0.attn1'},
            c2: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.0.attentions.1.transformer_blocks.0.attn1'},
            c3: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.1.attentions.0.transformer_blocks.0.attn1'},
            c4: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.1.attentions.1.transformer_blocks.0.attn1'},
            c5: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.2.attentions.0.transformer_blocks.0.attn1'},
            c6: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.2.attentions.1.transformer_blocks.0.attn1'},
            c7: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.mid_block.attentions.0.transformer_blocks.0.attn1'},
            c8: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.0.transformer_blocks.0.attn1'},
            c9: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.1.transformer_blocks.0.attn1'},
            c10: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.1.attentions.2.transformer_blocks.0.attn1'},
            c11: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.0.transformer_blocks.0.attn1'},
            c12: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.1.transformer_blocks.0.attn1'},
            c13: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.2.transformer_blocks.0.attn1'},
            c14: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.0.transformer_blocks.0.attn1'},
            c15: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.1.transformer_blocks.0.attn1'},
            c16: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.2.transformer_blocks.0.attn1'},
            s1: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.0.attentions.0.transformer_blocks.0.attn2'},
            s2: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.0.attentions.1.transformer_blocks.0.attn2'},
            s3: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.1.attentions.0.transformer_blocks.0.attn2'},
            s4: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.1.attentions.1.transformer_blocks.0.attn2'},
            s5: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.2.attentions.0.transformer_blocks.0.attn2'},
            s6: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.down_blocks.2.attentions.1.transformer_blocks.0.attn2'},
            s7: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.mid_block.attentions.0.transformer_blocks.0.attn2'},
            s8: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.1.transformer_blocks.0.attn2'},
            s9: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.2.transformer_blocks.0.attn2'},
            s10: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.3.transformer_blocks.0.attn2'},
            s11: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.1.transformer_blocks.0.attn2'},
            s12: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.2.transformer_blocks.0.attn2'},
            s13: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.2.attentions.3.transformer_blocks.0.attn2'},
            s14: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.1.transformer_blocks.0.attn2'},
            s15: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.2.transformer_blocks.0.attn2'},
            s16: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white', name: '.unet.up_blocks.3.attentions.3.transformer_blocks.0.attn2'}
            }
        };
        
    },
    components:{
        //Card,
        InputText,
        Button,
        InputNumber,

    },
    methods:{
        generate(){
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
            const request = { prompt: this.prompt_value, seed: this.seed_value, interventions: [cross_intervention, self_intervention]}
            //request

            fetch('localhost:8001/generate', {
                method: 'POST',
                body: JSON.stringify(request)
            }).then(response => 
            
            )
            // alert(this.prompt_value)
        },
        handleRectangleClick() {
            console.log('layer was clicked :P');
        },
        toggleColor(rectKey) {
            this.modules[rectKey].isClicked = !this.modules[rectKey].isClicked;
        }
    }
}

</script>