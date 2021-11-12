import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createStats } from './components/stats.js'

import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'
import { createControls } from './systems/controls.js'
import { BoidManager } from './systems/BoidManager.js'
import { createBoidsGui } from './systems/gui.js'


// effective "private" class fields
let camera, renderer, scene, loop, stats;

class World {
    constructor(container) {
        // General setup
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        
        loop = new Loop(camera, scene, renderer)
        
        // HTML element
        container.append(renderer.domElement);
        
        // Stats
        stats = createStats();
        container.append(stats.dom)
        loop.updateableObjects.push(stats)

        // Resizer
        const resizer = new Resizer(container, camera, renderer)
        
        // Controls setup
        const controls = createControls(camera, renderer.domElement);
        loop.updateableObjects.push(controls)

        // Lighting
        const {ambientLight, directionalLight} = createLights();
        scene.add(ambientLight, directionalLight)

        // Boid Manager
        const boidManager = new BoidManager(30)
        loop.updateableObjects.push(boidManager)
        boidManager.addBoidsToScene(scene)

        // Gui
        const gui = createBoidsGui(boidManager.settings)

    }

    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start()
    }

    stop() {
        loop.stop()
    }
}

export { World }