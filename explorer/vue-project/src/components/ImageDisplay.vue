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
            <!-- activate loading again... <Skeleton v-show="loading" class="loading" style="width: 100%; height:100%;"></Skeleton> -->
            <img :src="imageUrl" alt="Image" />
        </div>
    </div>
    <!--
    <Button class="imagebutton" label="<" severity="info" @click="imagebar_visible = !imagebar_visible"></Button>
    -->
</template>


<style>
.imagebutton {
    position:fixed;
    right:0px;
    border-color: rgb(0, 255, 0) !important;
    /* transform: rotate(-90deg); */
    background-color: rgb(0, 255, 0) !important;
}


.imagebar {
    padding: 5px;
}

.image-container img {
    width: 256px;
    height: 256px;
    /* object-fit: contain; */
    padding: 0px;
    display: block;
    align-items: center;
    border-color: rgb(0, 255, 0);
    border-style: solid;
}
</style>