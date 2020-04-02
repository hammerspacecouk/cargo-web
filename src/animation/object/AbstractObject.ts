import * as THREE from "three";

export abstract class AbstractObject {
  public abstract tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void;
  public abstract getObject(): THREE.Object3D;
}
