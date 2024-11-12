<script>



import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

export default {
    name: "Explorer",
    components: {
        TresCanvas,
        OrbitControls

    },
    data() {
        return {
            test: [[0, 0, 0], [0, 0, 1.5], [0, 1.5, 0]]
        }
    }
}

</script>

<template>
    <TresCanvas clear-color=”#82DBC5” window-size>
        <TresPerspectiveCamera />
        <OrbitControls />
        <TresMesh v-for="(item, index) in test" :position="item">
            <TresBoxGeometry :args="[.05, 1, 1]" />
            <TresMeshBasicMaterial color="#008080" />
        </TresMesh>
    </TresCanvas>
</template>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

#app {
    height: 100%;
    width: 100%;
    background-color: #000;
}
</style>
