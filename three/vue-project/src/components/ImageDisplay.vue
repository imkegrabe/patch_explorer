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
    <!-- will have loop here to contain all cached images... -->
    <div class="image-container">
        <!-- activate loading again... <Skeleton v-show="loading" class="loading" style="width: 100%; height:100%;"></Skeleton> -->
        <img :src="imageUrl" alt="Image" />
    </div>
</template>


<style>
.image-container img {
    width: 256px;
    height: 256px;
    object-fit: contain;
    padding: 5px;
    display: block;
    align-items: center;
}
</style>