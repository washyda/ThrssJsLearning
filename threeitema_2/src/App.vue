<template>
  <div id="app">
    <!-- <Three></Three> -->
    <!-- <Buffer></Buffer> -->
<!--    <Material></Material>-->
    <BufferVertices></BufferVertices>
  </div>
</template>

<script>
// import Three from '@/components/Three/Three.vue'
// import Buffer from '@/components/Buffer/Buffer.vue'
// import Material from '@/components/Mateial/Material.vue'
import BufferVertices from '@/components/BufferVertices/BufferVertices.vue'
export default {
  name: 'App',
  components: {
    // Three
    // Buffer
    // Material,
    BufferVertices
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
