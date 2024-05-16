<template>
  <SDExplorer :host="'http://localhost:8002'"/>
</template>

<script>
import SDExplorer from './components/SDExplorer.vue'

export default {
  name: 'App',
  components: {
    SDExplorer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
