import * as THREE from "three";
import { AbstractObject } from "./AbstractObject";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { IShipClass } from "../../interfaces";

export class Ship extends AbstractObject {
  private ship: GLTF;

  constructor(shipClass: IShipClass, callback: (object: GLTF) => void) {
    super();
    const loader = new GLTFLoader();
    loader.load(`/models/ships/${shipClass.id}/scene.gltf`, (gltf: GLTF) => {
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
    return this.ship?.scene;
  }
}
