<template>
    <div class="image-container" style="width: 40vh; height:40vh;">
        <Skeleton v-show="loading" style="width: 100%; height:100%;"></Skeleton>
        <img v-show="!loading" :src="imageUrl" alt="Image" />
    </div>
</template>
<style>


.image-container{
    padding:50px;
    background-image: v-bind('frame');
    background-size:cover;
}
</style>
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
            frame: "url(" + require('@/assets/frame.jpg') + ")",
        }
    },
    methods: {

    }

}
</script>
