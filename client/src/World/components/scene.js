import { Scene, Color } from "../../../vendor/three/build/three.module.js"

function createScene() {
  const scene = new Scene();

  scene.background = new Color("grey")
  
  return scene;
}

export { createScene }