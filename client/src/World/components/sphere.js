import { SphereBufferGeometry, MeshPhongMaterial, MeshStandardMaterial, Mesh } from "../../../vendor/three/build/three.module.js"

function createSphere() {
  const geometry = new SphereBufferGeometry(0.5, 32, 16, 0, Math.PI*2, 0, Math.PI);

  const material = new MeshStandardMaterial({color: "purple"});

  const sphere = new Mesh(geometry, material)

  sphere.position.x = 2

  return sphere;
}

export { createSphere }