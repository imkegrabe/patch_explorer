<template>
    <div class="image-container" style="width: 40vh; height:40vh;">
        <Skeleton v-show="loading" style="width: 100%; height:100%;"></Skeleton>
        <img v-show="!loading" :src="imageUrl" alt="Image" />
    </div>
</template>
<style></style>
<script>

import Skeleton from 'primevue/skeleton';

export default {
    name: "ImageDisplay",
    components: {
        Skeleton
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
