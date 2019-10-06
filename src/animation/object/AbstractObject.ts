import * as THREE from "three";

export abstract class AbstractObject {
  abstract tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void;
  abstract getObject(): THREE.Object3D;
}
