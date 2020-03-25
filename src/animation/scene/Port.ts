import * as THREE from "three";
import { AbstractScene } from "./AbstractScene";
import { Planet } from "../object/Planet";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { ShipInOrbit } from "../object/ShipInOrbit";
import { IShip, IShipClass } from "../../interfaces";

export const PLANET_Z_POSITION = -350;

export class Port extends AbstractScene {
  private readonly planetType: string;

  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private planet: Planet;
  private ships: ShipInOrbit[] = [];
  private allShips: IShip[];

  constructor(planetType: string, allShips: IShip[]) {
    super();
    this.allShips = allShips;
    this.planetType = planetType;
  }

  init() {
    this.createAmbientLight();
    this.createLight();
    this.createPlanet();
    this.createShips();
  }

  getPlanetSize() {
    return Math.min(Math.min(this.width, this.height) * 0.9, 400);
  }

  createAmbientLight() {
    if (this.ambientLight) {
      this.scene.remove(this.ambientLight);
    }
    this.ambientLight = new THREE.AmbientLight(0x060606);
    this.scene.add(this.ambientLight);
  }

  createLight() {
    if (this.light) {
      this.scene.remove(this.light);
    }
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(-(this.width / 2), this.height / 2, 500);
    this.scene.add(this.light);
  }

  createPlanet() {
    if (this.planet) {
      this.scene.remove(this.planet.getObject());
    }
    const radius = this.getPlanetSize() / 2;
    this.planet = new Planet(this.planetType, radius);
    this.scene.add(this.planet.getObject());
  }

  createShips() {
    this.ships.forEach(ship => {
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

  calculateOffset(index: number, total: number): number {
    const segment = 1 / total;
    return index * segment;
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void {
    this.planet.tick(timeNow, msSinceLastFrame, msSinceStart);
    this.renderer.render(this.scene, this.camera);
    this.ships.forEach(ship => {
      ship.tick(timeNow, msSinceLastFrame, msSinceStart);
    });
  }
}
