import { BoxBufferGeometry, MeshPhongMaterial, MeshStandardMaterial, Mesh, MathUtils } from "../../../vendor/three/build/three.module.js"

function createCube() {
    const geometry = new BoxBufferGeometry(2, 2, 2);

    const material = new MeshStandardMaterial({ color: "green" });

    const cube = new Mesh(geometry, material)

    const radiansPerSecond = MathUtils.degToRad(30)

    cube.position.x = -2

    cube.render = (delta) => {
        const rotationAmount = radiansPerSecond * delta
        cube.rotation.z += 0.01;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }

    return cube;
}

export { createCube }