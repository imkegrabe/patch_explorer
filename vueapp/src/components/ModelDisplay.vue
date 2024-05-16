<template>
    <div class="attn-container">

        <div class="self-attn-viz">
            <h2 style="text-align: left;">self-attentions (click to place intervention):</h2>
            <div class="level-1-row">
                <div class="down-1">

                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.s1.isClicked ? modules.s1.color : modules.s1.defaultColor }"
                        @click="toggleColor('s1')"> 1 </div>
                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.s2.isClicked ? modules.s2.color : modules.s2.defaultColor }"
                        @click="toggleColor('s2')"> 2 </div>

                </div>
                <div class="up-3">
                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.s14.isClicked ? modules.s14.color : modules.s14.defaultColor }"
                        @click="toggleColor('s14')"> 14 </div>
                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.s15.isClicked ? modules.s15.color : modules.s15.defaultColor }"
                        @click="toggleColor('s15')"> 15 </div>
                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.s16.isClicked ? modules.s16.color : modules.s16.defaultColor }"
                        @click="toggleColor('s16')"> 16 </div>
                </div>
            </div>

            <div class="level-2-row">
                <div class="down-2">
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.s3.isClicked ? modules.s3.color : modules.s3.defaultColor }"
                        @click="toggleColor('s3')"> 3</div>
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.s4.isClicked ? modules.s4.color : modules.s4.defaultColor }"
                        @click="toggleColor('s4')"> 4</div>
                </div>
                <div class="up-2">
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.s11.isClicked ? modules.s11.color : modules.s11.defaultColor }"
                        @click="toggleColor('s11')"> 11 </div>
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.s12.isClicked ? modules.s12.color : modules.s12.defaultColor }"
                        @click="toggleColor('s12')"> 12 </div>
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.s13.isClicked ? modules.s13.color : modules.s13.defaultColor }"
                        @click="toggleColor('s13')"> 13 </div>
                </div>
            </div>

            <div class="level-3-row">
                <div class="down-3">
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.s5.isClicked ? modules.s5.color : modules.s5.defaultColor }"
                        @click="toggleColor('s5')"> 5 </div>
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.s6.isClicked ? modules.s6.color : modules.s6.defaultColor }"
                        @click="toggleColor('s6')"> 6 </div>
                </div>
                <div class="up-1">
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.s8.isClicked ? modules.s8.color : modules.s8.defaultColor }"
                        @click="toggleColor('s8')"> 8 </div>
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.s9.isClicked ? modules.s9.color : modules.s9.defaultColor }"
                        @click="toggleColor('s9')"> 9 </div>
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.s10.isClicked ? modules.s10.color : modules.s10.defaultColor }"
                        @click="toggleColor('s10')"> 10 </div>
                </div>
            </div>
            <div class="level-4-row">
                <div class="mid">
                    <div class="level-4-rec"
                        :style="{ backgroundColor: modules.s7.isClicked ? modules.s7.color : modules.s7.defaultColor }"
                        @click="toggleColor('s7')"> 7 </div>
                </div>
            </div>

        </div>

        <div class="cross-attn-viz">
            <h2 style="text-align: left;">cross-attentions (click to place intervention):</h2>
            <div class="level-1-row">
                <div class="down-1">

                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.c1.isClicked ? modules.c1.color : modules.c1.defaultColor }"
                        @click="toggleColor('c1')"> 1 </div>
                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.c2.isClicked ? modules.c2.color : modules.c2.defaultColor }"
                        @click="toggleColor('c2')"> 2 </div>

                </div>
                <div class="up-3">
                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.c14.isClicked ? modules.c14.color : modules.c14.defaultColor }"
                        @click="toggleColor('c14')"> 14 </div>
                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.c15.isClicked ? modules.c15.color : modules.c15.defaultColor }"
                        @click="toggleColor('c15')"> 15 </div>
                    <div class="level-1-rec"
                        :style="{ backgroundColor: modules.c16.isClicked ? modules.c16.color : modules.c16.defaultColor }"
                        @click="toggleColor('c16')"> 16 </div>
                </div>
            </div>

            <div class="level-2-row">
                <div class="down-2">
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.c3.isClicked ? modules.c3.color : modules.c3.defaultColor }"
                        @click="toggleColor('c3')"> 3</div>
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.c4.isClicked ? modules.c4.color : modules.c4.defaultColor }"
                        @click="toggleColor('c4')"> 4</div>
                </div>
                <div class="up-2">
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.c11.isClicked ? modules.c11.color : modules.c11.defaultColor }"
                        @click="toggleColor('c11')"> 11</div>
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.c12.isClicked ? modules.c12.color : modules.c12.defaultColor }"
                        @click="toggleColor('c12')"> 12</div>
                    <div class="level-2-rec"
                        :style="{ backgroundColor: modules.c13.isClicked ? modules.c13.color : modules.c13.defaultColor }"
                        @click="toggleColor('c13')"> 13</div>
                </div>
            </div>

            <div class="level-3-row">
                <div class="down-3">
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.c5.isClicked ? modules.c5.color : modules.c5.defaultColor }"
                        @click="toggleColor('c5')"> 5 </div>
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.c6.isClicked ? modules.c6.color : modules.c6.defaultColor }"
                        @click="toggleColor('c6')"> 6 </div>
                </div>
                <div class="up-1">
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.c8.isClicked ? modules.c8.color : modules.c8.defaultColor }"
                        @click="toggleColor('c8')"> 8 </div>
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.c9.isClicked ? modules.c9.color : modules.c9.defaultColor }"
                        @click="toggleColor('c9')"> 9 </div>
                    <div class="level-3-rec"
                        :style="{ backgroundColor: modules.c10.isClicked ? modules.c10.color : modules.c10.defaultColor }"
                        @click="toggleColor('c10')"> 10 </div>
                </div>
            </div>

            <div class="level-4-row">
                <div class="mid">
                    <div class="level-4-rec"
                        :style="{ backgroundColor: modules.c7.isClicked ? modules.c7.color : modules.c7.defaultColor }"
                        @click="toggleColor('c7')"> 7 </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.attn-container {
    display: flex;
    flex-direction: column;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
}

.image-container {
    display: flex;
    margin: 10px;
}


.cross-attn-viz {
    display: flex;
    flex-direction: column;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
    /* height: calc(64px + 32px + 16px + 8px); */
    font-size: 6px;
    position: relative;
    /* left: 4px;
    top: 4px; */
}

.self-attn-viz {
    display: flex;
    flex-direction: column;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
    /* height: calc(64px + 32px + 16px + 8px); */
    font-size: 6px;
    position: relative;
}

.level-1-row {
    display: flex;
    flex-direction: row;
    height: 64px;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
    height: 64px;
}

.level-2-row {
    display: flex;
    flex-direction: row;
    height: 32px;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
}

.level-3-row {
    display: flex;
    flex-direction: row;
    height: 16px;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
}

.level-4-row {
    display: flex;
    flex-direction: row;
    height: 8px;
    width: calc(64px*5 + 32px*5 + 16px*5 + 8px);
}


.down-1 {
    display: flex;
    flex-direction: row;
    width: calc(64px*2);
    height: 64px;
}

.down-2 {
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2);
    width: calc(32px*2);
    height: 32px;
}

.down-3 {
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2 + 32px*2);
    width: calc(16px*2);
    height: 16px;
}

.mid {
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2 + 32px*2 + 16px*2);
    width: 8px;
    height: 8px;
}

.up-1 {
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2 + 32px*2 + 8px);
    width: calc(16px*3);
    height: 16px;
}

.up-2 {
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(64px*2 + 16px*2 + 8px + 16px*3);
    width: calc(32px*3);
    height: 32px;
}

.up-3 {
    display: flex;
    flex-direction: row;
    position: relative;
    left: calc(32px*2 + 16px*2 + 8px + 16px*3 + 32px*3);
    width: calc(64px*3);
    height: 64px;
}


.level-1-rec {
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

.level-2-rec {
    width: 32px;
    height: 32px;
    border: 1px dashed #13FF1D;
    display: flex;
    justify-content: center;
    align-items: center;
}

.level-3-rec {
    width: 16px;
    height: 16px;
    border: 1px dashed #13FF1D;
    display: flex;
    justify-content: center;
    align-items: center;
}

.level-4-rec {
    width: 8px;
    height: 8px;
    border: 1px dashed #13FF1D;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<script>
export default {
    name: "ModelDisplay",
    components: {

    },
    props: {
        modules: Object
    },
    data() {
        return {

        }
    },
    methods: {

        toggleColor(rectKey) {
            // eslint-disable-next-line vue/no-mutating-props
            this.modules[rectKey].isClicked = !this.modules[rectKey].isClicked;
        }
    }

}
</script>
