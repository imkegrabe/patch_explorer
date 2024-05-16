<template>
    <div class="image-container">
        <div class="image">
            <img :src="imageUrl" alt="Image" style="max-width: 100%; max-height: 300px;" />
        </div>
    </div>
</template>
<style></style>
<script>

export default {
    name: "ImageDisplay",
    components: {

    },
    props: {
        imageUrl: String
    },
    data() {
        return {

        }
    },
    methods: {

    }

}
</script>
