<template>
  <Explorer :host="'http://localhost:8002'"></Explorer>
</template>


<script>
import Explorer from './components/Explorer.vue';

export default {
  name: 'App',
  components: {
    Explorer
  }
}
</script>


<style scoped>
#app {
  background-color: white;
}
</style>
