<script>

import Skeleton from 'primevue/skeleton';
import Button from 'primevue/button';

export default {
    name: "ImageDisplay",
    components: {
        Skeleton,
        Button,
    },
    props: {
        imageUrl: String,
        loading: Boolean
    },
    data() {
        return {
            imagebar_visible: true,
        }
    },
    methods: {
        toggle(){
            this.imagebar_visible = !this.imagebar_visible;
        }
    }
}
</script>



<template>
    <div class="imagebar" v-if="imagebar_visible">
    <!-- will have loop here to contain all cached images... -->
        <div class="image-container">
            <Skeleton v-show="loading" class="loading" style="width: 100%; height:100%;"></Skeleton>
            <!-- activate loading again... <Skeleton v-show="loading" class="loading" style="width: 100%; height:100%;"></Skeleton> -->
            <img v-show="!loading" :src="imageUrl" alt="Image" @load="$emit('update:loading', false)" 
            @error="$emit('update:loading', false)" />
        </div>
    </div>
    <Button class="button" label="Output" severity="info" @click="imagebar_visible = !imagebar_visible" style="position:fixed;top:10px;right:20px;background-color:rgba(0, 255, 255, 1); color:black" /> 

</template>


<style>
.image-container img {
    width: 256px;
    height: 256px;
    /* object-fit: contain; */
    padding: 5px;
    display: block;
    align-items: center;
    border-color: white;
    border-style: solid;
}
</style>