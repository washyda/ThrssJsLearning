/*
 * @Author: itwashy 2304758771@qq.com
 * @Date: 2023-02-20 18:36:31
 * @LastEditors: itwashy 2304758771@qq.com
 * @LastEditTime: 2023-03-01 21:32:35
 * @FilePath: \Demo13-ThreeJs\three_basic_1\src\main\main01.js
 * @Description: 
 * 
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 引入动画库
import gsap from 'gsap'
//  引入性能监视器
import Stats  from 'three/examples/jsm/libs/stats.module.js'
// 初始化性能监视器
let stats = new Stats()
// 设置初次进入模式
// 展示帧率
// stats.setMode(0)
// 展示渲染帧间隔时长
stats.setMode(1)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(15, 5, 15)
scene.add(camera)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls( camera, renderer.domElement )

// 插入性能监视器及canvas画布
document.body.appendChild(renderer.domElement)
document.body.appendChild(stats.domElement)

const clock = new THREE.Clock()
// to方法 移动对象 动画属性 结束之后的回调
const animate1 = gsap.to(cube.position, {
    // 移动x轴距离做动画
    x: 5, 
    // 设置动画延时
    delay: 2,
    // 设置是否做往返运动
    yoyo: true,
    // 时间5s
    duration: 5,
    // 重复次数 -1无限循环
    repeat: -1,
    // 动画曲线
    ease: "power1.inOut",
    onComplete: () => {
        console.log('动画结束');
    },
    onStart: () => {
        console.log('动画开始');
    }
})
const animate2 = gsap.to(cube.rotation, {
    x: 2 * Math.PI, 
    delay: 2,
    yoyo: true,
    duration: 5,
    repeat: -1,
    ease: "power1.inOut",
    onComplete: () => {
        console.log('动画结束');
    },
    onStart: () => {
        console.log('动画开始');
    }
})
// 双击停止开始动画
window.addEventListener('dblclick', function () {
    if(animate1.isActive() || animate2.isActive()) {
        animate1.pause()
        animate2.pause()
    } else {
        animate1.resume()
        animate2.resume()
    }
})
// 窗口尺寸变化 动态自适应
window.addEventListener('resize', function() {
    // 更新摄像头锥体长宽比
    camera.aspect = this.innerWidth / this.innerHeight
    // 在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix来使得这些改变生效。
    camera.updateProjectionMatrix()
    // 更新渲染器尺寸
    renderer.setSize(this.innerWidth, this.innerHeight)
    renderer.setPixelRatio(renderer.getPixelRatio())

})
function render() {
    // let time = clock.getElapsedTime()
    // let t = clock.getDelta()
    // console.log('每一帧渲染的时间为', time);
    // let times = (time / 1000) % 5;
    // cube.position.x = time % 5 * 1
    // if(cube.position.x > 5) {
    //     cube.position.x = 0
    // }
    // 更新性能监视器
    stats.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()