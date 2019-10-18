import * as THREE from "three";
import { AbstractObject } from "./AbstractObject";

const TIME_TO_COMPLETE_ORBIT = 20000;

export class Ship extends AbstractObject {
  private readonly ship: THREE.Sprite;
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
    startOffset = 0
  ) {
    super();
    this.centreX = centreX;
    this.centreY = centreY;
    this.centreZ = centreZ;
    this.xRadius = xRadius;
    this.startOffset = startOffset;
    this.ship = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load( '/ship.svg' )
      })
    );
    this.ship.scale.set(25, 25, 1);
    this.ship.position.set(this.centreX + this.startOffset, this.centreY, this.centreZ + 50);
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    const tickTime = ((timeNow % TIME_TO_COMPLETE_ORBIT) / TIME_TO_COMPLETE_ORBIT) * (Math.PI * 2);
    const x = this.centreX + (Math.sin(tickTime) * this.xRadius);
    const zRadius = 150;
    const z = this.centreZ + (Math.cos(tickTime) * zRadius);

    const yRadius = 60;
    const y = this.centreY + (Math.sin(tickTime) * yRadius);

    // console.log(x);
    this.ship.position.set(x, y, z);
  }

  getObject(): THREE.Object3D {
    return this.ship;
  }
}
