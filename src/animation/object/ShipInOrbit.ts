import * as THREE from "three";
import { AbstractObject } from "./AbstractObject";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { IShipClass } from "../../interfaces";

const TIME_TO_COMPLETE_ORBIT = 50000;

// todo - abstract the Ship object itself
export class ShipInOrbit extends AbstractObject {
  private ship: GLTF;
  private readonly orbitRadius: number;

  constructor(shipClass: IShipClass, orbitRadius: number, callback: (object: GLTF) => void) {
    super();
    this.orbitRadius = orbitRadius;

    const loader = new GLTFLoader();
    loader.load(`/models/ships/${shipClass.id}/scene.gltf`, (gltf: GLTF) => {
      this.ship = gltf;
      this.ship.scene.rotation.order = "ZYX";

      this.ship.scene.rotation.z = Math.PI / 2;
      this.ship.scene.rotation.y = 0;
      this.ship.scene.rotation.x = 0;

      callback(this.ship);
    });
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    if (!this.ship) {
      return;
    }

    const tickTime = ((timeNow % TIME_TO_COMPLETE_ORBIT) / TIME_TO_COMPLETE_ORBIT) * (Math.PI * 2);
    const x = Math.sin(tickTime) * this.orbitRadius;
    const y = Math.sin(tickTime) * 50;
    const z = Math.cos(tickTime) * this.orbitRadius;

    this.ship.scene.rotation.x = tickTime + Math.PI / 2;
    this.ship.scene.position.set(x, y, z);
  }

  getObject(): THREE.Object3D {
    return this.ship.scene;
  }
}
