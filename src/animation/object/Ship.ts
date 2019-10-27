import * as THREE from "three";
import { AbstractObject } from "./AbstractObject";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Ship extends AbstractObject {
  private ship: GLTF;

  constructor(callback: (object: GLTF) => void) {
    super();
    const loader = new GLTFLoader();
    loader.load("/models/shuttle/scene.gltf", (gltf: GLTF) => {
      this.ship = gltf;
      callback(this.ship);
    });
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    if (!this.ship) {
      return;
    }
  }

  getObject(): THREE.Object3D {
    if (this.ship) {
      return this.ship.scene;
    }
  }
}
