<template>
  <div class="container" ref="container"></div>
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
      // 设置场景
      const scene = new THREE.Scene();
      //   设置相机
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.set(5, 5, 5);
      //   设置渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.container.appendChild(renderer.domElement);
      //   加载控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      const AxesHelper = new THREE.AxesHelper(20);
      //   创建图形
      const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
      const textureLoader = new THREE.TextureLoader();
      const doormaterial = textureLoader.load("textures/door/color.jpg");
      const alphaDoor = textureLoader.load("textures/door/alpha.jpg");
      const aoDoor = textureLoader.load("textures/door/ambientOcclusion.jpg");
      //   纹理高度
      const doorHeightTexture = textureLoader.load("textures/door/height.jpg");
      //   粗糙度
      const roughDoor = textureLoader.load("textures/door/roughness.jpg");
      // 金属贴图
      const doormetal = textureLoader.load("textures/door/metalness.jpg");
      //   法线贴图
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
        roughness: 1,
        roughnessMap: roughDoor,
        metalness: 1,
        metalnessMap: doormetal,
        normalMap: normaltexture,
      });
      const cube = new THREE.Mesh(geometry, material);
      // color - (参数可选）颜色的rgb数值。缺省值为 0xffffff。
      // intensity - (参数可选)光照的强度。缺省值为 1。
      //   环境光
      //   const light = new THREE.AmbientLight(0x404040, 1 ); // soft white light
      //   设置直线灯光
      const light = new THREE.DirectionalLight(0x404040, 2);
      // 设置灯光位置
      light.position.set(5, 5, 10);
      // 加载高度

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