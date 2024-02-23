import './style.css'

import * as THREE from 'three'
import { setPerspectiveCamera, setRenderer, setStars } from './helpers/scene'

let { height, width, mouseX, mouseY } = {
    height: window.innerHeight,
    width: window.innerWidth,
    mouseX: 0,
    mouseY: 0
}

const { aspectRatio, fieldOfView, nearPlane, farPlane, windowHalfX, windowHalfY } = {
    aspectRatio: width / height,
    fieldOfView: 75,
    nearPlane: 1,
    farPlane: 1000,
    windowHalfX: width / 2,
    windowHalfY: height / 2
}

const scene = new THREE.Scene({ antialias: true })
scene.fog = new THREE.FogExp2(0x000000, .0003)

const { camera } = setPerspectiveCamera({ fieldOfView, aspectRatio, nearPlane, farPlane })
const { renderer } = setRenderer({ width, height })
setStars({ scene })

window.addEventListener('resize', ()=> {
    width = window.innerWidth
    height = window.innerHeight

    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
})
window.addEventListener('mousemove', e=> {
    mouseX = e.clientX - windowHalfX
    mouseY = e.clientY - windowHalfY
})

const animate = () => {
    requestAnimationFrame(animate)
    render()
}

const render = () => {
    camera.position.x += ( mouseX - camera.position.x ) * .005
    camera.position.y += ( mouseY - camera.position.y ) * .005

    camera.lookAt(scene.position)
    renderer.render(scene, camera)
}

animate()