<script>

import Skeleton from 'primevue/skeleton';

export default {
    name: "ImageDisplay",
    components: {
        Skeleton,
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

<template>

    <div class="image-container" style="width: 256px; height:256px;">
        <Skeleton v-show="loading" class="loading" style="width: 100%; height:100%;"></Skeleton>
        <img style="width: 100%;height: 100%;" v-show="!loading" :src="imageUrl" alt="Image" />
    </div>

</template>



<style>
.loading {
    border-radius: 0;
}
</style>