<template>
    <Panel header="Image" toggleable class="not-zoomable" style="position: fixed; top: 0px; right: 0px">
        <div class="image-container" style="width: 40vh; height:40vh;">
            <Skeleton v-show="loading" style="width: 100%; height:100%;"></Skeleton>
            <img v-show="!loading" :src="imageUrl" alt="Image" />
        </div>
    </Panel>
</template>
<style></style>
<script>

import Skeleton from 'primevue/skeleton';
import Panel from 'primevue/panel';

export default {
    name: "ImageDisplay",
    components: {
        Skeleton,
        Panel
    },
    props: {
        imageUrl: String,
        loading: Boolean
    },
    data() {
        return {
        }
    },
    methods: {

    }

}
</script>
