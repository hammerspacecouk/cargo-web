import * as THREE from "three";
import {AbstractScene} from "./AbstractScene";
import { Ship } from "../object/Ship";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

const ROTATE_TIME = 30000;

export class ShipDisplay extends AbstractScene {
  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private ship: Ship;

  init() {
    this.camera.position.set(0, 0, 75);

    this.createAmbientLight();
    this.createLight();
    this.createShip();

  }

  createAmbientLight() {
    if (this.ambientLight) {
      this.scene.remove(this.ambientLight);
    }
    this.ambientLight = new THREE.AmbientLight(0xcccccc);
    this.scene.add(this.ambientLight);
  }

  createLight() {
    if (this.light) {
      this.scene.remove(this.light);
    }
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(-(this.width / 2), this.height / 2, 500);
    this.scene.add(this.light);
  }

  createShip() {
    if (this.ship) {
      this.scene.remove(this.ship.getObject());
    }
    this.ship = new Ship((object: GLTF) => {
      object.scene.position.set(0,0,0);
      this.scene.add(object.scene);
    });
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    if (!this.ship.getObject()) {
      return;
    }

    const tickTime = ((timeNow % ROTATE_TIME) / ROTATE_TIME) * (Math.PI * 2);
    this.ship.getObject().rotation.x = tickTime;
    this.ship.getObject().rotation.y = tickTime;
    this.ship.getObject().rotation.z = tickTime ;

    this.renderer.render(this.scene, this.camera);
  }
}
