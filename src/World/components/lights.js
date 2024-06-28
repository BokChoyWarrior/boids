import { AmbientLight, DirectionalLight, HemisphereLight } from "../../../vendor/three/build/three.module.js"

function createLights() {
  // Create a directional light
  const directionalLight = new DirectionalLight('white', 6);
  const ambientLight = new HemisphereLight('white', 'darkslategrey', 2)

  // move the light right, up, and towards us
  directionalLight.position.set(10, 10, 10);

  return {directionalLight, ambientLight};
}

export { createLights };