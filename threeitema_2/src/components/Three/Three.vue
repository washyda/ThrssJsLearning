<template>
  <div class="three-container" ref="three"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'

export default {
  name: 'Three',
  data() {
    return {}
  },
  mounted() {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(0, 0, 10)

    scene.add(camera)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    const controls = new OrbitControls(camera, renderer.domElement)

    const params = {
      color: '#ffff00',
      animate1: () => {
        gsap.to(cube.position, {
          x: 5,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          duration: 5
        })
      }
    }

    const gui = new dat.GUI()
    gui.add(camera.position, 'x').min(0).max(30).step(0.01).name('相机x坐标')
    gui.add(camera.position, 'y').min(0).max(30).step(0.01).name('相机y坐标')
    gui.add(camera.position, 'z').min(0).max(30).step(0.01).name('相机z坐标')

    const folder = gui.addFolder('物体操作')
    folder.add(cube.position, 'x').min(0).max(30).step(0.01).name('物体x坐标')
    folder.add(cube.position, 'y').min(0).max(30).step(0.01).name('物体y坐标')
    folder.add(cube.position, 'z').min(0).max(30).step(0.01).name('物体z坐标')
    folder.addColor(params, 'color').onChange((value) => {
        cube.material.color.set(value)
    })
    folder.add(params, 'animate1').name('立方体运动')
    folder.add(cube.material, 'wireframe')

    this.$refs.three.appendChild(renderer.domElement)
    function render() {
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    render()
    window.addEventListener('dblclick', function() {
        const fullScreen = this.document.fullscreenElement
        if(!fullScreen) {
            renderer.domElement.requestFullscreen()
        } else {
            this.document.exitFullscreen()
        }
    })
    window.addEventListener('resize', function() {
        camera.aspect = this.window.innerWidth / this.window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(this.window.innerWidth, this.window.innerHeight)
        renderer.setPixelRatio = this.window.devicePixelRatio
    })
  },
  methods: {}
}
</script>

<style>
.three-container {
  background-color: aqua;
}
</style>
