import { OrbitControls } from '../../../vendor/three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas)

    controls.rendered = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.render = () => {
        controls.update()
        controls.rendered = true
    }
    controls.simulate = () => controls.rendered = false

    return controls
}

export { createControls }