import { AbstractScene, DISTANCE_PLANE } from "./AbstractScene";
import * as THREE from "three";

interface IStar extends THREE.Vector3 {
  velocity?: number;
}

export class IntroStars extends AbstractScene {
  private starAccelerationPerSecond = 1.2;

  private ambientLight: THREE.AmbientLight;
  private light: THREE.Light;
  private starGeo: THREE.Geometry;
  private stars: THREE.Points;
  private moveStars = true;

  public constructor() {
    super();
  }

  public init() {
    this.createAmbientLight();
    this.createLight();
    this.createStars();
  }

  public stopStars() {
    this.moveStars = false;
  }

  public tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number) {
    this.handleStars(msSinceLastFrame);
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

  private createStars() {
    if (this.stars) {
      this.scene.remove(this.stars);
    }

    this.starGeo = new THREE.Geometry();
    for (let i = 0; i < 2500; i++) {
      const star: IStar = new THREE.Vector3(
        -this.width / 2 + Math.random() * this.width,
        -this.height / 2 + Math.random() * this.height,
        -DISTANCE_PLANE / 2 + Math.random() * DISTANCE_PLANE
      );
      star.velocity = 0;
      this.starGeo.vertices.push(star);
    }

    const sprite = new THREE.TextureLoader().load("/_static/textures/star-texture.png");
    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      map: sprite,
      transparent: true,
    });

    this.stars = new THREE.Points(this.starGeo, starMaterial);
    this.scene.add(this.stars);
  }

  private handleStars(msSinceLastFrame: number) {
    const acceleration = (this.starAccelerationPerSecond / 1000) * Math.min(500, msSinceLastFrame);
    this.starGeo.vertices.forEach((p: IStar) => {
      if (p.z > DISTANCE_PLANE / 2) {
        // stars will stop being replaced once we begin arriving
        if (this.moveStars) {
          p.z = -DISTANCE_PLANE / 2 + Math.random() * 50;
          p.velocity = 0;
        }
      } else {
        p.velocity += acceleration;
        p.z += p.velocity;
      }
    });
    this.stars.rotateZ(0.005);
    this.starGeo.verticesNeedUpdate = true;
  }
}
