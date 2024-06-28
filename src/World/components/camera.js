import { PerspectiveCamera } from "../../../vendor/three/build/three.module.js"

function createCamera() {
  const camera = new PerspectiveCamera(75, 1, 0.1, 100000);

  camera.position.z = 50

  return camera;
}

export { createCamera }