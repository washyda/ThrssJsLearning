<template>
  <div class="container" ref="container">
    <div ref="loading" style="position: fixed; top: 0; right: 20px;color: white; width: 100px; height: 100px;"></div>
  </div>
</template>
  
  <script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  data() {
    return {};
  },
  methods: {
    initThree() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.set(5, 5, 5);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.container.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      const AxesHelper = new THREE.AxesHelper(20);
      const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);

      // 创建加载管理器
      const loading = new THREE.LoadingManager();
      const textureLoader = new THREE.TextureLoader(loading);
      // 为当前纹理加载器指定管理器
      loading.onLoad = () => {
        console.log("加载完成");
      };
      loading.onProgress = (url, itemsLoaded, itemsTotal) => {
        let value = ((itemsLoaded / itemsTotal) * 100).toFixed(2) + '%';
        console.log("图片地址" + url);
        console.log("加载进度" + value);
        this.$refs.loading.innerHTML = value
        console.log("加载完成");
      };
      loading.onError = (url) => {
        console.log("加载失败" + url);
      };

      const doormaterial = textureLoader.load("textures/door/color.jpg");
      const alphaDoor = textureLoader.load("textures/door/alpha.jpg");
      const aoDoor = textureLoader.load("textures/door/ambientOcclusion.jpg");
      const doorHeightTexture = textureLoader.load("textures/door/height.jpg");
      const roughDoor = textureLoader.load("textures/door/roughness.jpg");
      const doormetal = textureLoader.load("textures/door/metalness.jpg");
      const normaltexture = textureLoader.load("textures/door/normal.jpg");
      geometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
      );
      console.log(geometry);
      const material = new THREE.MeshStandardMaterial({
        color: "#ffff00",
        map: doormaterial,
        alphaMap: alphaDoor,
        transparent: true,
        side: THREE.DoubleSide,
        aoMap: aoDoor,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        roughness: 0.8,
        roughnessMap: roughDoor,
        metalness: 0.7,
        metalnessMap: doormetal,
        normalMap: normaltexture,
      });
      const cube = new THREE.Mesh(geometry, material);
      const light = new THREE.DirectionalLight(0x404040, 2);
      light.position.set(5, 5, 10);

      scene.add(camera, AxesHelper, cube, light);
      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      render();
    },
  },
  mounted() {
    this.initThree();
  },
};
</script>
  
  <style>
</style>