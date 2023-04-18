<template>
  <div class="container" ref="container">
    <div ref="loading" style="position: fixed; top: 0; right: 20px; color: white; width: 100px; height: 100px"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  data() {
    return {}
  },
  methods: {
    initThree() {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
      camera.position.set(5, 5, 5)
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.container.appendChild(renderer.domElement)
      const controls = new OrbitControls(camera, renderer.domElement)
      const AxesHelper = new THREE.AxesHelper(5)

      const CubeTextureLoader = new THREE.CubeTextureLoader()
      CubeTextureLoader.setPath('textures/environmentMaps/3/')
      const envObject = CubeTextureLoader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

      const sphereGeometry = new THREE.SphereBufferGeometry(1, 40, 40)
      const material = new THREE.MeshStandardMaterial({
        color: '#fff',
        roughness: 0.1,
        metalness: 0.7
        // envMap: envObject,
      })
      material.magFilter = THREE.NearestFilter
      scene.background = envObject
      // 设置图像默认环境贴图
      scene.environment = envObject

      const sphere = new THREE.Mesh(sphereGeometry, material)

      const light = new THREE.AmbientLight(0x404040, 1)
      const light1 = new THREE.DirectionalLight(0x404040, 1)
      light1.position.set(5, 5, 10)

      scene.add(camera, AxesHelper, sphere, light, light1)
      // 窗口尺寸变化 动态自适应
      window.addEventListener('resize', function () {
        // 更新摄像头锥体长宽比
        camera.aspect = this.innerWidth / this.innerHeight
        // 在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix来使得这些改变生效。
        camera.updateProjectionMatrix()
        // 更新渲染器尺寸
        renderer.setSize(this.innerWidth, this.innerHeight)
        renderer.setPixelRatio(renderer.getPixelRatio())
      })
      function render() {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
      }
      render()
    }
  },
  mounted() {
    this.initThree()
  }
}
</script>

<style></style>
