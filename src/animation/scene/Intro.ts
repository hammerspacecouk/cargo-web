import { AbstractScene } from "./AbstractScene";
import * as THREE from "three";
import { easeOut } from "../../utils/math";
import { PLANET_Z_POSITION } from "./Port";
import { Planet } from "../object/Planet";

interface IStar extends THREE.Vector3 {
  velocity?: number
}

export class Intro extends AbstractScene {
  private planetStartZPosition = -this.distancePlane;
  private planetFinalZPosition = PLANET_Z_POSITION;
  private planetAppearTime = 15000;
  private planetStopTime = 20000;
  private starAccelerationPerSecond = 1.2;

  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private starGeo: THREE.Geometry;
  private stars: THREE.Points;
  private planet: Planet;

  private readonly planetType: string;

  constructor(planetType: string) {
    super();
    this.planetType = planetType;
  }

  init() {
    this.createAmbientLight();
    this.createLight();
    this.createStars();
    this.createPlanet();
  }

  tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number) {
    this.handlePlanet(timeNow, msSinceLastFrame, msSinceStart);
    this.handleStars(msSinceLastFrame, msSinceStart);
    this.renderer.render(this.scene, this.camera);
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
    const radius = (Math.min(this.width, this.height) * 0.4) / 2;
    this.planet = new Planet(this.planetType, radius);
  }

  createStars() {
    if (this.stars) {
      this.scene.remove(this.stars);
    }
    this.starGeo = new THREE.Geometry();
    for (let i = 0; i < 6000; i++) {
      let star: IStar = new THREE.Vector3(
        Math.random() * this.width,
        Math.random() * this.height,
        Math.random() * -500
      );
      star.velocity = 0;
      this.starGeo.vertices.push(star);
    }


    let sprite = new THREE.TextureLoader().load("/star-texture.png");
    let starMaterial = new THREE.PointsMaterial({
      size: 0.7,
      map: sprite,
      transparent: true
    });

    this.stars = new THREE.Points(this.starGeo, starMaterial);
    this.scene.add(this.stars);
  }

  handlePlanet(timeNow: number, msSinceLastFrame: number, msSinceStart: number) {
    // planet does not appear until 5 seconds in
    if (msSinceStart < this.planetAppearTime) {
      return;
    }

    if (this.planet.getObject().parent !== this.scene) {
      // add the planet in the initial position
      this.planet.getObject().position.set(this.width / 2, this.height / 2, this.planetStartZPosition);
      this.scene.add(this.planet.getObject());
    }

    if (msSinceStart <= this.planetStopTime) {
      // transition between
      const diffBetweenPositions = this.planetFinalZPosition - this.planetStartZPosition;
      const diffBetweenTime = this.planetStopTime - this.planetAppearTime;
      const timeElapsed = msSinceStart - this.planetAppearTime;
      this.planet.getObject().position.z = easeOut(timeElapsed,this.planetStartZPosition, diffBetweenPositions, diffBetweenTime);
    } else {
      this.planet.getObject().position.z = this.planetFinalZPosition;
    }

    this.planet.tick(timeNow, msSinceLastFrame, msSinceStart);
  }

  handleStars(msSinceLastFrame: number, msSinceStart: number) {
    const acceleration = ((this.starAccelerationPerSecond / 1000) * Math.min(500, msSinceLastFrame));
    if (msSinceStart > this.planetStopTime) {
      if (this.stars.parent === this.scene) {
        this.scene.remove(this.stars);
      }
      return;
    }
    this.starGeo.vertices.forEach((p: IStar) => {
      if (p.z > 0) {
        if (msSinceStart < this.planetAppearTime) {
          p.z = - (500 - (Math.random() * 50));
          p.velocity = 0;
        }
      } else {
        p.velocity += acceleration;
        p.z += p.velocity;
      }
    });
    this.stars.rotateZ(0.0002);
    this.starGeo.verticesNeedUpdate = true;
  }
}
