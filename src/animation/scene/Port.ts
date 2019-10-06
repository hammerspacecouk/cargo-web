import * as THREE from "three";
import { AbstractScene } from "./AbstractScene";
import { Planet } from "../object/Planet";

export const PLANET_Z_POSITION = -350;

export class Port extends AbstractScene {
  private readonly planetType: string;

  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private planet: Planet;

  constructor(planetType: string) {
    super();
    this.planetType = planetType;
  }

  init() {
    this.createAmbientLight();
    this.createLight();
    this.createPlanet();
  }

  createAmbientLight() {
    if (this.ambientLight) {
      this.scene.remove(this.ambientLight);
    }
    this.ambientLight = new THREE.AmbientLight(0x121212);
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

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    this.planet.tick(timeNow, msSinceLastFrame, msSinceStart);
    this.renderer.render(this.scene, this.camera);
  }
}
