// HTML/MARKUP FOR CONTENT
<template>

    <div class ="cross-attn-viz">
        
        <div class="level-1-row">
            <div class="down-1">
                
                <div class="level-1-rec"
                :style= " {backgroundColor: c1.isClicked ? c1.color : c1.defaultColor }"
                @click="toggleColor('c1')"
                > 1 </div>    
                <div class="level-1-rec"
                :style= " {backgroundColor: c2.isClicked ? c2.color : c2.defaultColor }"
                @click="toggleColor('c2')"
                > 2 </div>          

            </div>
            <div class="up-3">
                <div class="level-1-rec"
                :style= " {backgroundColor: c14.isClicked ? c14.color : c14.defaultColor }"
                @click="toggleColor('c14')"
                > 14 </div>
                <div class="level-1-rec"
                :style= " {backgroundColor: c15.isClicked ? c15.color : c15.defaultColor }"
                @click="toggleColor('c15')"
                > 15 </div>
                <div class="level-1-rec"
                :style= " {backgroundColor: c16.isClicked ? c16.color : c16.defaultColor }"
                @click="toggleColor('c16')"
                > 14 </div>
            </div>
        </div>
        
        <div class="level-2-row">
            <div class="down-2">
                <div class="level-2-rec"
                :style= " {backgroundColor: c3.isClicked ? c3.color : c3.defaultColor }"
                @click="toggleColor('c3')"
                > 3</div>
                <div class="level-2-rec"
                :style= " {backgroundColor: c4.isClicked ? c4.color : c4.defaultColor }"
                @click="toggleColor('c4')"
                > 4</div>
            </div>
            <div class="up-2">
                <div class="level-2-rec"
                :style= " {backgroundColor: c11.isClicked ? c11.color : c11.defaultColor }"
                @click="toggleColor('c11')"
                > 11</div>
                <div class="level-2-rec"
                :style= " {backgroundColor: c12.isClicked ? c12.color : c12.defaultColor }"
                @click="toggleColor('c12')"
                > 12</div>
                <div class="level-2-rec"
                :style= " {backgroundColor: c13.isClicked ? c13.color : c13.defaultColor }"
                @click="toggleColor('c13')"
                > 13</div>
            </div>
        </div>
        
        <div class="level-3-row">
            <div class="down-3">
                <div class="level-3-rec"
                :style= " {backgroundColor: c5.isClicked ? c5.color : c5.defaultColor }"
                @click="toggleColor('c5')"
                > 5 </div>
                <div class="level-3-rec"
                :style= " {backgroundColor: c6.isClicked ? c6.color : c6.defaultColor }"
                @click="toggleColor('c6')"
                >  6 </div>
            </div>
            <div class="up-1">
                <div class="level-3-rec"
                :style= " {backgroundColor: c8.isClicked ? c8.color : c8.defaultColor }"
                @click="toggleColor('c8')"
                > 8 </div>
                <div class="level-3-rec"
                :style= " {backgroundColor: c9.isClicked ? c9.color : c9.defaultColor }"
                @click="toggleColor('c9')"
                > 9 </div>
                <div class="level-3-rec"
                :style= " {backgroundColor: c10.isClicked ? c10.color : c10.defaultColor }"
                @click="toggleColor('c10')"
                > 10 </div>
            </div>
        </div>
        
        <div class="level-4-row">
            <div class="mid">
                <div class="level-4-rec"
                :style= " {backgroundColor: c7.isClicked ? c7.color : c7.defaultColor }"
                @click="toggleColor('c7')"
                > 7 </div>
            </div>
        </div>
    </div>

    <div class ="self-attn-viz">
        
        <div class="level-1-row">
            <div class="down-1">
                
                <div class="level-1-rec"
                :style= " {backgroundColor: s1.isClicked ? s1.color : s1.defaultColor }"
                @click="toggleColor('s1')"
                > 1 </div>    
                <div class="level-1-rec"
                :style= " {backgroundColor: s2.isClicked ? s2.color : s2.defaultColor }"
                @click="toggleColor('s2')"
                > 2 </div>          

            </div>
            <div class="up-3">
                <div class="level-1-rec"
                :style= " {backgroundColor: s14.isClicked ? s14.color : s14.defaultColor }"
                @click="toggleColor('s14')"
                > 14 </div>
                <div class="level-1-rec"
                :style= " {backgroundColor: s15.isClicked ? s15.color : s15.defaultColor }"
                @click="toggleColor('s15')"
                > 15 </div>
                <div class="level-1-rec"
                :style= " {backgroundColor: s16.isClicked ? s16.color : s16.defaultColor }"
                @click="toggleColor('s16')"
                > 14 </div>
            </div>
        </div>
        
        <div class="level-2-row">
            <div class="down-2">
                <div class="level-2-rec"
                :style= " {backgroundColor: s3.isClicked ? s3.color : s3.defaultColor }"
                @click="toggleColor('s3')"
                > 3</div>
                <div class="level-2-rec"
                :style= " {backgroundColor: s4.isClicked ? s4.color : s4.defaultColor }"
                @click="toggleColor('s4')"
                > 4</div>
            </div>
            <div class="up-2">
                <div class="level-2-rec"
                :style= " {backgroundColor: s11.isClicked ? s11.color : s11.defaultColor }"
                @click="toggleColor('s11')"
                > 11</div>
                <div class="level-2-rec"
                :style= " {backgroundColor: s12.isClicked ? s12.color : s12.defaultColor }"
                @click="toggleColor('s12')"
                > 12</div>
                <div class="level-2-rec"
                :style= " {backgroundColor: s13.isClicked ? s13.color : s13.defaultColor }"
                @click="toggleColor('s13')"
                > 13</div>
            </div>
        </div>
        
        <div class="level-3-row">
            <div class="down-3">
                <div class="level-3-rec"
                :style= " {backgroundColor: s5.isClicked ? s5.color : s5.defaultColor }"
                @click="toggleColor('s5')"
                > 5 </div>
                <div class="level-3-rec"
                :style= " {backgroundColor: s6.isClicked ? s6.color : s6.defaultColor }"
                @click="toggleColor('s6')"
                >  6 </div>
            </div>
            <div class="up-1">
                <div class="level-3-rec"
                :style= " {backgroundColor: s8.isClicked ? s8.color : s8.defaultColor }"
                @click="toggleColor('s8')"
                > 8 </div>
                <div class="level-3-rec"
                :style= " {backgroundColor: s9.isClicked ? s9.color : s9.defaultColor }"
                @click="toggleColor('s9')"
                > 9 </div>
                <div class="level-3-rec"
                :style= " {backgroundColor: s10.isClicked ? s10.color : s10.defaultColor }"
                @click="toggleColor('s10')"
                > 10 </div>
            </div>
        </div>
        
        <div class="level-4-row">
            <div class="mid">
                <div class="level-4-rec"
                :style= " {backgroundColor: s7.isClicked ? s7.color : s7.defaultColor }"
                @click="toggleColor('s7')"
                > 7 </div>
            </div>
        </div>
    </div>

    <div class="input-row">
    
    <label for="username" >Prompt</label>
    <InputText id="username" v-model="value" aria-describedby="username-help" />
    <small id="username-help">Provide a prompt pls.</small>

    </div>

    <div class="button-test">
        <Button label="Submit" @click="test('hi Louie <3 :)')" />
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
.cross-attn-viz {
    display: flex;
    flex-direction: column;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
    height: calc(64px + 32px + 16px + 8px);
    font-size: 6px;
}
.self-attn-viz {
    display: flex;
    flex-direction: column;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
    height: calc(64px + 32px + 16px + 8px);
    font-size: 6px;
    position: relative;
    left: 0px;
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


export default {
    name: 'SDExplorer',
    props: {
        msg: String
    },
    data() {
        return {
            value: '',  // Initialize 'value' with an empty string or appropriate initial value
            c1: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c2: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c3: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c4: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c5: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c6: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c7: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c8: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c9: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c10: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c11: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c12: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c13: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c14: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c15: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},
            c16: { isClicked: false, color: 'rgba(56, 255, 255, 0.6)', defaultColor: 'white'},

            s1: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s2: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s3: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s4: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s5: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s6: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s7: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s8: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s9: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s10: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s11: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s12: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s13: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s14: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s15: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'},
            s16: { isClicked: false, color: 'rgba(236, 255, 0, 0.6)', defaultColor: 'white'}
        };
        
    },
    components:{
        //Card,
        InputText,
        Button,

    },
    methods:{
        test(message){
            alert(message)
        },
        handleRectangleClick() {
            console.log('layer was clicked :P');
        },
        
        toggleColor(rectKey) {
            this[rectKey].isClicked = !this[rectKey].isClicked;
        }
    }
}

</script>