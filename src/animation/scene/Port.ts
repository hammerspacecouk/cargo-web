import * as THREE from "three";
import { AbstractScene } from "./AbstractScene";
import { Planet } from "../object/Planet";
import { Ship } from "../object/Ship";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export const PLANET_Z_POSITION = -350;

export class Port extends AbstractScene {
  private readonly planetType: string;

  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private planet: Planet;
  private ship: Ship;

  constructor(planetType: string) {
    super();
    this.planetType = planetType;
  }

  init() {
    this.createAmbientLight();
    this.createLight();
    this.createPlanet();
    this.createShip();
  }

  createAmbientLight() {
    if (this.ambientLight) {
      this.scene.remove(this.ambientLight);
    }
    this.ambientLight = new THREE.AmbientLight(0x242424);
    this.scene.add(this.ambientLight);
  }

  createLight() {
    if (this.light) {
      this.scene.remove(this.light);
    }
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(-(this.width / 2), (this.height / 2), 100);
    this.scene.add(this.light);
  }

  createPlanet() {
    if (this.planet) {
      this.scene.remove(this.planet.getObject());
    }
    this.planet = new Planet(this.planetType);
    this.planet.getObject().position.set(this.width / 2, this.height / 2, PLANET_Z_POSITION);
    this.scene.add(this.planet.getObject());
  }

  createShip() {
    if (this.ship) {
      this.scene.remove(this.ship.getObject());
    }
    this.ship = new Ship(
      this.width / 2,
      this.height / 2,
      PLANET_Z_POSITION,
      150, //(this.width - 32) / 2 // todo - why are the coordinates off
      0,
      (object: GLTF) => {
        this.scene.add(object.scene);
      }
    );
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    this.planet.tick(timeNow, msSinceLastFrame, msSinceStart);
    this.ship.tick(timeNow, msSinceLastFrame, msSinceStart);
    this.renderer.render(this.scene, this.camera);
  }
}
