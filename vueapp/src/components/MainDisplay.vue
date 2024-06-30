<template>
    <div>
        <panZoom selector=".zoomable">
            <div class="attn-container zoomable">
                <div class="modules">
                    <ModuleDisplay
                        v-for="(modulegrids, index) in allGrids"
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


export default {

    name: "MainDisplay",
    
    components: {
        ModuleDisplay,

    },
    props: {
        allGrids: Array
    },

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
