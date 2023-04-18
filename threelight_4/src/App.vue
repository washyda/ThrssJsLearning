<template>
  <div id="app">
    <VueComponent></VueComponent>
  </div>
</template>

<script>
import VueComponent from './components/shadow.vue'

export default {
  name: 'App',
  components: {
    VueComponent
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
