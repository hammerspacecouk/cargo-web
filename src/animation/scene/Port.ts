import * as THREE from "three";
import { AbstractScene } from "./AbstractScene";
import {Planet} from "@src/animation/object/Planet";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { ShipInOrbit } from "@src/animation/object/ShipInOrbit";
import { IShip } from "@src/interfaces";

export class Port extends AbstractScene {
  private readonly planetId: string;

  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private planet: Planet;
  private ships: ShipInOrbit[] = [];
  private allShips: IShip[];

  public constructor(planetId: string, allShips: IShip[]) {
    super();
    this.allShips = allShips;
    this.planetId = planetId;
  }

  public init() {
    this.createAmbientLight();
    this.createLight();
    this.createPlanet();
    this.createShips();
  }

  public tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    this.planet.tick(timeNow, msSinceLastFrame, msSinceStart);
    this.renderer.render(this.scene, this.camera);
    this.ships.forEach((ship) => {
      ship.tick(timeNow, msSinceLastFrame, msSinceStart);
    });
  }

  private getPlanetSize() {
    return Math.min(Math.min(this.width, this.height) * 0.9, 400);
  }

  private createAmbientLight() {
    if (this.ambientLight) {
      this.scene.remove(this.ambientLight);
    }
    this.ambientLight = new THREE.AmbientLight(0x060606);
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

  private createPlanet() {
    if (this.planet) {
      this.scene.remove(this.planet.getObject());
    }
    const radius = this.getPlanetSize() / 2;
    this.planet = new Planet(this.planetId, radius);
    this.scene.add(this.planet.getObject());
  }

  private createShips() {
    this.ships.forEach((ship) => {
      if (ship && ship.getObject()) {
        this.scene.remove(ship.getObject());
      }
    });

    const orbitRadius = Math.max(this.getPlanetSize() * 1.2, this.width * 0.9) / 2;
    const total = this.allShips.length;
    for (let i = 0; i < total; i++) {
      this.ships.push(
        new ShipInOrbit(this.allShips[i].shipClass, this.calculateOffset(i, total), orbitRadius, (object: GLTF) => {
          this.scene.add(object.scene);
        })
      );
    }
  }

  private calculateOffset(index: number, total: number): number {
    const segment = 1 / total;
    return index * segment;
  }
}
