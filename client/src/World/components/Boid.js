import { CylinderBufferGeometry, MeshPhongMaterial, MeshNormalMaterial, MeshStandardMaterial, Mesh, Vector3 } from "../../../vendor/three/build/three.module.js"

class Boid extends Mesh {
    constructor(settings) {
        // const geometry = new SphereBufferGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI);
        const geometry = new CylinderBufferGeometry(2, 0, 5, 20, 1, false, 0, 2*Math.PI);
        const material = new MeshPhongMaterial({ 
            color: "darkgreen",
            flatShading: false,

        });
        super(geometry, material)

        this.rendered = false;

        this.settings = settings

        this.numCohereFlockmates = 0;
        this.numAlignFlockmates = 0;

        this.cumulativeFlockmateAlignment = new Vector3()
        this.cumulativeFlockmateMass = new Vector3()
        
        this.separationVector = new Vector3()
        this.avgFlockmateAlignment = new Vector3()
        this.offsetToFlockCentre = new Vector3()
        this.offsetToTarget = new Vector3()

        this.alignForce = new Vector3()
        this.separateForce = new Vector3()
        this.cohereForce = new Vector3()
        this.findTargetForce = new Vector3()

        this.acceleration = new Vector3()

        // boid general
        this.velocity = new Vector3().random().clampLength(settings.minSpeed, settings.maxSpeed)
        console.log(this.velocity)

        const boxSize = 50

        this.position.set(
            Math.random() * boxSize - (boxSize / 2),
            Math.random() * boxSize - (boxSize / 2),
            Math.random() * boxSize - (boxSize / 2)
        )

    }

    // properties
    get direction() {
        return this.velocity.clone().normalize()
    }
    
    // methods
    resetBrain() {
        this.numCohereFlockmates = 0;
        this.numAlignFlockmates = 0;

        this.cumulativeFlockmateAlignment = new Vector3()
        this.cumulativeFlockmateMass = new Vector3()
        
        this.separationVector = new Vector3()
        this.avgFlockmateAlignment = new Vector3()
        this.offsetToFlockCentre = new Vector3()
        this.offsetToTarget = new Vector3()

        this.alignForce = new Vector3()
        this.separateForce = new Vector3()
        this.cohereForce = new Vector3()
        this.findTargetForce = new Vector3()

        this.acceleration = new Vector3()
    }

    updateRulesForFlockmate(boidB) {
        const sqrDistance = this.position.distanceToSquared(boidB.position)
        
        // cohere
        if (sqrDistance < Math.pow(this.settings.cohereRadius, 2)) {
            this.numCohereFlockmates += 1
            this.cumulativeFlockmateMass.add(boidB.position)
        }

        // align
        if (sqrDistance < Math.pow(this.settings.alignRadius, 2)) {
            this.numAlignFlockmates += 1;
            this.cumulativeFlockmateAlignment.add(boidB.direction)
        }

        // separate
        if (sqrDistance < Math.pow(this.settings.separateRadius, 2)) {
            const offset = boidB.position.clone().addScaledVector(this.position, -1)
            this.separationVector.addScaledVector(offset, -1 / sqrDistance)
        }
    }

    finalizeForces() {
        if (this.numCohereFlockmates > 0) {

            this.offsetToFlockCentre = this.cumulativeFlockmateMass
                .clone()
                .multiplyScalar(1/ this.numCohereFlockmates)
                .addScaledVector(this.position, -1)

            if (this.numAlignFlockmates > 0) {
                this.avgFlockmateAlignment = this.cumulativeFlockmateAlignment
                    .clone()
                    .multiplyScalar(1 / this.numAlignFlockmates)
            }

            this.offsetToTarget = this.settings.target
                .clone()
                .addScaledVector(this.position, -1)

        } 
        // else {
        //     this.offsetToFlockCentre = new Vector3()
        //     this.avgFlockmateAlignment = new Vector3()
        // }

        this.alignForce = this.steerTowards(this.avgFlockmateAlignment)    .multiplyScalar(this.settings.alignWeight)
        this.separateForce = this.steerTowards(this.separationVector)      .multiplyScalar(this.settings.separateWeight)
        this.cohereForce = this.steerTowards(this.offsetToFlockCentre)     .multiplyScalar(this.settings.cohereWeight)
        this.findTargetForce = this.steerTowards(this.offsetToTarget)      .multiplyScalar(this.settings.findTargetWeight)


        // if (i === 1) {
        //     // console.info("Forces for boid 1:")
        //     // console.info(this.offsetToFlockCentre)
        //     // console.info(this.avgFlockmateAlignment)
        //     // console.info(this.separationVector)
        // }
    }

    steerTowards(direction) {
        // if there is no force, return the same (0, 0, 0) vector
        if (0 === direction.x && 0 === direction.y && 0 === direction.z) {
            return new Vector3()
        }

        const vect = direction
            .clone()
            .setLength(this.settings.maxSpeed)
            .addScaledVector(this.velocity, -1)

        return vect.clampLength(0, this.settings.maxSteerForce)
    }

    render = (delta) => {

        this.acceleration = new Vector3()
            .add(this.alignForce)
            .add(this.separateForce)
            .add(this.cohereForce)
            .add(this.findTargetForce)

        this.velocity
            .addScaledVector(this.acceleration, delta)
            .clampLength(this.settings.minSpeed, this.settings.maxSpeed)

        // console.log(this.velocity.x, this.velocity.y, this.velocity.z)
        this.position.add(this.velocity.clone().multiplyScalar(delta))

        this.lookAt(this.position.clone().add(this.velocity))

        this.rotateX(3*Math.PI/2)

        this.rendered = true;
    }

}

export { Boid }