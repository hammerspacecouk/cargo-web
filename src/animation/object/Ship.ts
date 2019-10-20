import * as THREE from "three";
import { AbstractObject } from "./AbstractObject";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const TIME_TO_COMPLETE_ORBIT = 100000;

export class Ship extends AbstractObject {
  private ship: GLTF;
  private readonly startOffset: number;
  private readonly centreX: number;
  private readonly centreY: number;
  private readonly centreZ: number;
  private readonly xRadius: number;

  constructor(
    centreX: number,
    centreY: number,
    centreZ: number,
    xRadius: number,
    startOffset = 0,
    callback: (object: GLTF) => void
  ) {
    super();
    this.centreX = centreX;
    this.centreY = centreY;
    this.centreZ = centreZ;
    this.xRadius = xRadius;
    this.startOffset = startOffset;

    const loader = new GLTFLoader();
    loader.load('/models/shuttle/scene.gltf', (gltf: GLTF) => {
      this.ship = gltf;
      this.ship.scene.scale.set(0.2, 0.2, 0.2);
      this.ship.scene.rotation.x = 0;
      this.ship.scene.rotation.y = Math.PI / 2;
      this.ship.scene.rotation.z = Math.PI / 2;
      callback(this.ship);
    });
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    if (!this.ship) {
      return;
    }


    const tickTime = ((timeNow % TIME_TO_COMPLETE_ORBIT) / TIME_TO_COMPLETE_ORBIT) * (Math.PI * 2);
    const x = this.centreX + (Math.sin(tickTime) * this.xRadius);
    const zRadius = 250;
    const z = this.centreZ + (Math.cos(tickTime) * zRadius);

    const yRadius = 60;
    const y = this.centreY + (Math.sin(tickTime) * yRadius);

    this.ship.scene.rotation.y = tickTime + (Math.PI / 2);
    this.ship.scene.position.set(x, y, z);
  }

  getObject(): THREE.Object3D {
    return this.ship.scene;
  }
}
