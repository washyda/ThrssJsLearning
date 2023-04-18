<template>
  <div class="buffer-container" ref="buffer"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'Buffer',
  data() {
    return {}
  },
  mounted() {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(10, 10, 10)

    scene.add(camera)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const TextureLoader = new THREE.TextureLoader()
    const vueColor = TextureLoader.load(
      // 资源URL
      'images/cxk.JPG',
    )
    const material = new THREE.MeshBasicMaterial({ map: vueColor })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    const controls = new OrbitControls(camera, renderer.domElement)

    this.$refs.buffer.appendChild(renderer.domElement)
    function render() {
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    render()
    window.addEventListener('dblclick', function () {
      const fullScreen = this.document.fullscreenElement
      if (!fullScreen) {
        renderer.domElement.requestFullscreen()
      } else {
        this.document.exitFullscreen()
      }
    })
    window.addEventListener('resize', function () {
      camera.aspect = this.window.innerWidth / this.window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(this.window.innerWidth, this.window.innerHeight)
      renderer.setPixelRatio = this.window.devicePixelRatio
    })
  }
}
</script>

<style>
.buffer-container {
  background-color: aqua;
}
</style>
