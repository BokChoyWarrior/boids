import { Resizer } from "./World/systems/Resizer.js";
import {
    Scene,
    WebGLRenderer,
    
    Camera,
    PerspectiveCamera,
    
    DirectionalLight,

    Vector3,

    Mesh,
    SphereBufferGeometry,
    BoxBufferGeometry,

    MeshPhongMaterial,

    Color,
} from "../vendor/three/build/three.module.js"

class Boid extends Mesh {
    static boidColor = 0xDB7093;
    constructor() {
        const geometry = new SphereBufferGeometry(0.2, 5, 5, 0, Math.PI * 2, 0, Math.PI);
        const material = new MeshPhongMaterial({ color: Boid.boidColor });
        super(geometry, material)

        this.geometry = geometry
        this.material = material
        this.position.x = (Math.random() * 5) - 2.5;
        this.position.y = (Math.random() * 5) - 2.5;
        this.position.z = (Math.random() * 5) - 2.5;
        this.velocity = new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    }

    render(timeDelta) {
        let diff = timeDelta * 0.001
        this.position.x += this.velocity.x * diff
        this.position.y += this.velocity.y * diff
        this.position.z += this.velocity.z * diff
    }
}

function main() {
    
    // Renderer
    const canvas = document.querySelector('canvas');
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    
    // Scene
    const scene = new Scene();
    scene.background = new Color('skyblue')

    // Camera
    const aspect = canvas.clientWidth / canvas.clientHeight;  // the canvas default
    const camera = new PerspectiveCamera(75, aspect, 0.1, 100);
    camera.position.z = 10;
    camera.lookAt(0, 0, 0);

    // Lighting
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Boids helper
    let boids = []
    function destroyBoids() {
        while (boids.length > 0) {
            const boid = boids.pop()

            boid.geometry.dispose()
            boid.material.dispose()
            scene.remove(boid)
        }
    }
    function makeboids() {
        for (let i = 0; i < 20; i++) {
            let boid = new Boid()
            scene.add(boid)
            boids.push(boid)
        }
    }



    makeboids()

    renderer.render(scene, camera);

    let totalTimeDelta = 0;
    let timeDelta = 0;
    let timeSinceRestart = 0;
    function render(time) {
        timeDelta = time - totalTimeDelta;
        totalTimeDelta = time;

        timeSinceRestart += timeDelta;
        if (timeSinceRestart > 5000) {
            destroyBoids()
            makeboids()
            timeSinceRestart = 0;
        }

        boids.forEach((boid) => {
            boid.render(timeDelta)
            // boid.lookAt(boid.velocity * time + boid.position)
        });
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
