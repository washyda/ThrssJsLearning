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
        // 投射阴影步骤
        // 1. 渲染器打开阴影渲染
        // 2. 光源投射阴影
        // 3. 物体投射阴影
        // 4. 平面接受阴影
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
        camera.position.set(5, 5, 5)
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        // 如果设置开启，允许在场景中使用阴影贴图。默认是 false。
        renderer.shadowMap.enabled = true
        this.$refs.container.appendChild(renderer.domElement)
        const controls = new OrbitControls(camera, renderer.domElement)
        const AxesHelper = new THREE.AxesHelper(5)
        const plane = new THREE.PlaneBufferGeometry(10,10)
  
        const sphereGeometry = new THREE.SphereBufferGeometry(1, 40, 40)
        const material = new THREE.MeshStandardMaterial({
          color: '#ffffff'
        })
        material.magFilter = THREE.NearestFilter
        const sphere = new THREE.Mesh(sphereGeometry, material)
        const planeGeometry = new THREE.Mesh(plane, material)
        // 物体投射阴影
        sphere.castShadow = true
        planeGeometry.position.set(0,-1,0)
        planeGeometry.rotation.x = -Math.PI/2
        // 平面接受阴影
        planeGeometry.receiveShadow = true
  
        const light = new THREE.AmbientLight(0x404040, 1.5)
        const light1 = new THREE.DirectionalLight(0x404040, 2)
        light1.position.set(10, 10, 10)
        // 灯光投射阴影
        light1.castShadow = true
  
        scene.add(camera, AxesHelper, sphere, planeGeometry, light, light1)
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
  