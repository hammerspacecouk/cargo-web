import { AbstractScene, DISTANCE_PLANE } from "./AbstractScene";
import * as THREE from "three";
import { easeOut } from "../../utils/math";
import { Planet } from "../object/Planet";

export class IntroPlanet extends AbstractScene {
  private planetStartZPosition = -DISTANCE_PLANE / 2;
  private planetFinalZPosition: number;
  private planetAppearTime: number;
  private planetStopTime: number;

  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private planet: Planet;

  private readonly planetId: string;

  public constructor(planetId: string) {
    super();
    this.planetId = planetId;
  }

  public init() {
    this.createAmbientLight();
    this.createLight();
    this.createPlanet();
  }

  public tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number) {
    this.handlePlanet(timeNow, msSinceLastFrame, msSinceStart);
    this.renderer.render(this.scene, this.camera);
  }

  private createAmbientLight() {
    if (this.ambientLight) {
      this.scene.remove(this.ambientLight);
    }
    this.ambientLight = new THREE.AmbientLight(0x121212);
    this.scene.add(this.ambientLight);
  }

  private createLight() {
    if (this.light) {
      this.scene.remove(this.light);
    }
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(-(this.width / 2), this.height / 2, 100);
    this.scene.add(this.light);
  }

  private createPlanet() {
    if (this.planet) {
      this.scene.remove(this.planet.getObject());
    }
    const radius = (Math.min(this.width, this.height) * 0.9) / 2;
    this.planetFinalZPosition = DISTANCE_PLANE / 2 - radius * 2;
    this.planet = new Planet(this.planetId, radius);
  }

  private handlePlanet(timeNow: number, msSinceLastFrame: number, msSinceStart: number) {
    if (this.planet.getObject().parent !== this.scene) {
      // add the planet in the initial position
      this.planet.getObject().position.set(0, 0, this.planetStartZPosition);
      this.scene.add(this.planet.getObject());
      this.planetAppearTime = msSinceStart;
      this.planetStopTime = msSinceStart + 10000;
    }

    if (msSinceStart <= this.planetStopTime) {
      // transition between
      const diffBetweenPositions = this.planetFinalZPosition - this.planetStartZPosition;
      const diffBetweenTime = this.planetStopTime - this.planetAppearTime;
      const timeElapsed = msSinceStart - this.planetAppearTime;
      this.planet.getObject().position.z = easeOut(
        timeElapsed,
        this.planetStartZPosition,
        diffBetweenPositions,
        diffBetweenTime
      );
    } else {
      this.planet.getObject().position.z = this.planetFinalZPosition;
    }

    this.planet.tick(timeNow, msSinceLastFrame, msSinceStart);
  }
}
