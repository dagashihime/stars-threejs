import * as THREE from 'three'

const webGLSupport = () => {
    try {
        const canvas = document.createElement('canvas')
        return !!(window.WebGLRenderingContext && (
            canvas.getContext('webgl') || canvas.getContext('experiment-webgl')
        ))
    } catch(e) {
        return false
    }
}

const setPerspectiveCamera = ({ fieldOfView, aspectRatio, nearPlane, farPlane })=> {
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
    camera.position.z = farPlane / 2

    return { camera }
}

const setRenderer = ({ width, height })=> {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)

    let renderer
    if(webGLSupport()) {
        renderer = new THREE.WebGLRenderer({ alpha: true, canvas })   
    } else {
        renderer = new THREE.CanvasRenderer(canvas)
    }

    renderer.setClearColor(0x000011, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    
    return { canvas, renderer }
}

const setStars = ({ scene, starQuantity = 45000 })=> {
    const geometry = new THREE.SphereGeometry(1000, 100, 50)

    const materialOptions = {
        size: 1.0,
        transparency: true,
        opacity: .7
    }

    const material = new THREE.PointsMaterial(materialOptions)

    let vertices = []
    for(let i = 0; i < starQuantity; i++) {
        let starVertex = new THREE.Vector3()
        starVertex.x = Math.random() * 2000 - 1000
        starVertex.y = Math.random() * 2000 - 1000
        starVertex.z = Math.random() * 2000 - 1000

        vertices.push(starVertex)
    }

    geometry.setFromPoints(vertices)

    const stars = new THREE.Points(geometry, material)
    scene.add(stars)
}

export {
    setPerspectiveCamera,
    setRenderer,
    setStars
}