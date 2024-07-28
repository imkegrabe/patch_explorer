<template>
    <!-- <Panel header="Image" toggleable class="not-zoomable" style="position: fixed; top: 0px; right: 0px; z-index: 999;"> -->
        <div class="image-container" style="width: 256px; height:256px;">
            <Skeleton v-show="loading" class="loading" style="width: 100%; height:100%;"></Skeleton>
            <img style="width: 100%;height: 100%;" v-show="!loading" :src="imageUrl" alt="Image" />
        </div>
    <!-- </Panel> -->
</template>
<style></style>
<script>

import Skeleton from 'primevue/skeleton';
// import Panel from 'primevue/panel';

export default {
    name: "ImageDisplay",
    components: {
        Skeleton,
        // Panel
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

<style>
.loading {
    border-radius: 0;
}

</style>