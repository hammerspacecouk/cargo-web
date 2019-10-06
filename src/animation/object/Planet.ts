import * as THREE from "three";
import { AbstractObject } from "./AbstractObject";

const PLANET_ROTATION_TIME = 120000;

export class Planet extends AbstractObject {
  private readonly planet: THREE.Mesh;

  constructor(planetType: string) {
    super();
    this.planet = new THREE.Mesh(
      new THREE.SphereGeometry(50, 32, 32),
      new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(`/planet-${planetType}.jpg`)
      })
    );
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    const fractionOfRotation = (timeNow % PLANET_ROTATION_TIME) / PLANET_ROTATION_TIME;
    this.planet.rotation.y = fractionOfRotation * (Math.PI * 2);
  }

  getObject(): THREE.Object3D {
    return this.planet;
  }
}
