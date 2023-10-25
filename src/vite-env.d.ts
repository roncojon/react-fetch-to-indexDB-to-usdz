/// <reference types="vite/client" />
import { USDModule } from "./USDModule";

export {};
global.THREE = global.THREE || require('three');

declare global {
  interface Window {
    envMap: THREE.Texture;
  }
}
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // add this line

// const controls = new OrbitControls(camera, renderer.domElement); // add this line