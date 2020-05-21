import * as THREE from "three";
import { AbstractScene } from "./AbstractScene";
import { Ship } from "@src/animation/object/Ship";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { IChannel, IShipClass } from "@src/interfaces";

const CYCLE_TIME = 30000;
const AMPLITUDE = 5;

export class TravellingShipScene extends AbstractScene {
  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private ship: Ship;
  private readonly shipClass: IShipClass;
  private readonly startTime: Date;
  private readonly endTime: Date;

  public constructor(shipClass: IShipClass, channel: IChannel) {
    super();
    this.shipClass = shipClass;
    this.startTime = new Date(channel.startTime);
    this.endTime = new Date(channel.arrival);
  }

  public init() {
    this.camera.position.set(0, 0, 75);

    this.createAmbientLight();
    this.createLight();
    this.createShip();
  }

  public tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    if (!this.ship.getObject()) {
      return;
    }

    const tickTime = ((timeNow % CYCLE_TIME) / CYCLE_TIME) * (Math.PI * 2);
    this.ship.getObject().position.y = Math.sin(tickTime) * AMPLITUDE;

    this.renderer.render(this.scene, this.camera);
  }

  private createAmbientLight() {
    if (this.ambientLight) {
      this.scene.remove(this.ambientLight);
    }
    this.ambientLight = new THREE.AmbientLight(0xcccccc);
    this.scene.add(this.ambientLight);
  }

  private createLight() {
    if (this.light) {
      this.scene.remove(this.light);
    }
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(-(this.width / 2), this.height / 2, 500);
    this.scene.add(this.light);
  }

  private createShip() {
    if (this.ship) {
      this.scene.remove(this.ship.getObject());
    }
    this.ship = new Ship(this.shipClass, (object: GLTF) => {
      object.scene.position.set(0, 0, -25);
      this.scene.add(object.scene);
      if (this.shipClass.isProbe) {
        this.ship.getObject().rotation.x = Math.PI / 2;
        this.ship.getObject().rotation.y = -Math.PI / 6;
      } else {
        this.ship.getObject().rotation.y = Math.PI / 2;
        this.ship.getObject().rotation.z = Math.PI / 10;
      }
    });
  }
}
