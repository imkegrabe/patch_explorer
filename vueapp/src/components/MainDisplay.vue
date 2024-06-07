<template>
    <div>
        <panZoom selector=".zoomable">
            <div class="attn-container zoomable">
                <div class="modules">
                    <ModuleDisplay
                        v-for="(modulegrids, index) in allgrids"
                        :key="index"
                        :modulegrids="modulegrids"
                    />
                </div>
            </div>

        </panZoom>
    </div>
</template>




<script>
import ModuleDisplay from './ModuleDisplay.vue';

import gridData from '@/assets/gridData.json';

export default {

    name: "MainDisplay",
    
    components: {
        ModuleDisplay,

    },

    data() {
        return {
            allgrids: gridData
        };
    }

}
</script>





<style>

.modules {
    display: flex;
    flex-direction: row;
    align-items: center; /*  flex-end; */
    gap: 20px;

}


</style>
