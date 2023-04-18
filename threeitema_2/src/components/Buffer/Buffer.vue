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

    //   const geometry = new THREE.BoxGeometry(1, 1, 1)
    //   const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    //   const cube = new THREE.Mesh(geometry, material)
    //   scene.add(cube)

    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.BufferGeometry()
      const vertices = new Float32Array(9) //指定数组元素为三元组
      for (let j = 0; j < 9; j++) {
        vertices[j] = Math.random() * 6 - 3
      }
      let color = new THREE.Color(Math.random(), Math.random(), Math.random())
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
      const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5})
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
    }

    // const geometry = new THREE.BufferGeometry()
    // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
    // 因为在两个三角面片里，这两个顶点都需要被用到。
    // const vertices = new Float32Array([
    //   -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

    //   1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0
    // ])

    // itemSize = 3 因为每个顶点都是一个三元组。每三个元素确定一个顶点
    // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    // const mesh = new THREE.Mesh(geometry, material)
    // scene.add(mesh)

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
