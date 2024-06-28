import { Clock } from "../../../vendor/three/build/three.module.js"

const clock = new Clock()

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updateableObjects = []
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.render()
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    };


    render() {
        
        let now = Date.now();
        let end = now;
        while (now < end) { now = Date.now(); } 
        const delta = clock.getDelta()
        for (const object of this.updateableObjects) {
            object.simulate()
        }
        for (const object of this.updateableObjects) {
            object.render(delta)
        }
    }
}

export { Loop }