import { Vector3 } from "../../../vendor/three/build/three.module.js";
import { Boid } from "../components/Boid.js"

const defaultSettings = {
    minSpeed: 75,
    maxSpeed: 100,
    maxSteerForce: 25,
    target: new Vector3(),

    cohereRadius: 400,
    alignRadius: 30,
    separateRadius: 50,
    findTargetRadius: 1000000,

    alignWeight: 4,
    cohereWeight: 8,
    separateWeight: 16,
    findTargetWeight: 3,
}

class BoidManager {
    constructor(numOfBoids, settings = defaultSettings) {
        this.boids = []
        this.rendered = false
        this.renderNumber = 0;

        this.defaults = settings

        this.settings = {...this.defaults}

        for (let i = 0; i < numOfBoids; i++) {
            const boid = new Boid(this.settings)
            this.boids.push(boid)
        }
    }

    addBoidsToScene(scene) {
        for (let boid of this.boids) {
            scene.add(boid)
        }
    }

    calculateRules() {

        for (let i = 0; i < this.boids.length; i++) {
            const boidA = this.boids[i]
            boidA.resetBrain()

            for (let j = 0; j < this.boids.length; j++) {
                if (i !== j) {
                    const boidB = this.boids[j]
                    boidA.updateRulesForFlockmate(boidB)
                }
            }
            boidA.finalizeForces()
        }
    }


    chooseNewTarget() {
        this.settings.target = new Vector3().random().multiplyScalar(50).addScalar(-25)
    }

    simulate() {
        this.calculateRules()
    }

    render(delta) {
        this.renderNumber += 1;
        if (this.renderNumber > 1000) {
            this.renderNumber = 0
            this.chooseNewTarget()
            console.log(this.settings.target)
        }

        for (let boid of this.boids) {
            boid.render(delta)
        }

        this.rendered = true
    }
}

export { BoidManager }