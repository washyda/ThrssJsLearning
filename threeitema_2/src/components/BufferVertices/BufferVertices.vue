<template>
  <div class="BufferVertices" ref="BufferVertices"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default {
  name: "BufferVertices",
  methods: {
    data() {
      return {
        renderer: null,
        Scene: null,
        camera: null
      }
    },
    initThreeJs() {
      this.Scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
      this.camera.position.set(10, 10, 10)
      this.Scene.add( this.camera );

      const axesHelper = new THREE.AxesHelper( 10 );
      this.Scene.add( axesHelper );

      const geometry = new THREE.BoxGeometry(2, 2, 2)
      geometry.scale(2,2,2);
      geometry.rotateX(Math.PI/4)
      const material = new THREE.MeshBasicMaterial({color: 0x666666 })
      const cube = new THREE.Mesh(geometry, material)
      this.Scene.add(cube)

      const light = new THREE.AmbientLight( 0x404040 ); // soft white light
      this.Scene.add( light );

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      })
      const controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.Scene.add(controls)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.getPixelRatio)
      this.$refs.BufferVertices.appendChild(this.renderer.domElement)
      this.render()
    },
    render() {
      this.renderer.render(this.Scene, this.camera);
      requestAnimationFrame(this.render)
    }
  },
  mounted() {
    this.initThreeJs()
  }
}
</script>

<style scoped>

</style>