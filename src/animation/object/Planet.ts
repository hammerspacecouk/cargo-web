import * as THREE from "three";
import { AbstractObject } from "./AbstractObject";

const PLANET_ROTATION_TIME = 120000;

export class Planet extends AbstractObject {
  private readonly planet: THREE.Mesh;

  public constructor(planetId: string, radius: number) {
    super();
    this.planet = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(`/_static/planets/${planetId.slice(-2)}.jpg`),
      })
    );
  }

  public tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    const fractionOfRotation = (timeNow % PLANET_ROTATION_TIME) / PLANET_ROTATION_TIME;
    this.planet.rotation.y = fractionOfRotation * (Math.PI * 2);
  }

  public getObject(): THREE.Object3D {
    return this.planet;
  }
}
