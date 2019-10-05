import { AbstractScene } from "./utils/AbstractScene";
import * as THREE from "three";

interface IStar extends THREE.Vector3 {
  velocity?: number
}

const DISTANCE_PLANE = 20000;
const PLANET_START_Z_POSITION = -DISTANCE_PLANE;
const PLANET_FINAL_Z_POSITION = -250;
const PLANET_ROTATION_TIME = 120000;
const PLANET_APPEAR_TIME = 15000;
const PLANET_STOP_TIME = 20000;

const STAR_ACCELERATION_PER_SECOND = 1.2;

const easeOut = (currentTime: number, startValue: number, changeInValue: number, duration: number) => {
  currentTime /= duration;
  return -changeInValue * currentTime*(currentTime-2) + startValue;
};

export class Intro extends AbstractScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private light: THREE.Light;
  private renderer: THREE.WebGLRenderer;

  private starGeo: THREE.Geometry;
  private stars: THREE.Points;
  private planet: THREE.Mesh;

  constructor(container: HTMLElement) {
    super(container);
    this.init();
  }

  init() {
    //create scene object
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x141414));
    this.setElements();

    //setup renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
  }

  setElements() {
    this.createCamera();
    this.createLight();
    this.createStars();
    this.createPlanet();
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
      this.scene.remove(this.planet);
    }
    this.planet = new THREE.Mesh(
      new THREE.SphereGeometry(50, 32, 32),
      new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load("/planet.jpg")
      })
    );
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

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, DISTANCE_PLANE);
    this.camera.position.set(this.width / 2, this.height / 2, 1);
  }

  resize() {
    this.renderer.setSize(0, 0);
    this.updateDimensions();
    this.renderer.setSize(this.width, this.height);
    this.setElements();
  }

  handlePlanet(msSinceLastFrame: number, msSinceStart: number) {
    // planet does not appear until 5 seconds in
    if (msSinceStart < PLANET_APPEAR_TIME) {
      return;
    }

    if (this.planet.parent !== this.scene) {
      // add the planet in the initial position
      this.planet.position.set(this.width / 2, this.height / 2, PLANET_START_Z_POSITION);
      this.scene.add(this.planet);
    }

    if (msSinceStart <= PLANET_STOP_TIME) {
      // transition between
      const diffBetweenPositions = PLANET_FINAL_Z_POSITION - PLANET_START_Z_POSITION;
      const diffBetweenTime = PLANET_STOP_TIME - PLANET_APPEAR_TIME;
      const timeElapsed = msSinceStart - PLANET_APPEAR_TIME;
      this.planet.position.z = easeOut(timeElapsed,PLANET_START_Z_POSITION, diffBetweenPositions, diffBetweenTime);
    } else {
      this.planet.position.z = PLANET_FINAL_Z_POSITION;
    }

    const fractionOfRotation = (msSinceStart % PLANET_ROTATION_TIME) / PLANET_ROTATION_TIME;
    this.planet.rotation.y = fractionOfRotation * (Math.PI * 2);
  }

  handleStars(msSinceLastFrame: number, msSinceStart: number) {
    const acceleration = ((STAR_ACCELERATION_PER_SECOND / 1000) * Math.min(500, msSinceLastFrame));
    if (msSinceStart > PLANET_STOP_TIME) {
      if (this.stars.parent === this.scene) {
        this.scene.remove(this.stars);
      }
      return;
    }
    this.starGeo.vertices.forEach((p: IStar) => {
      if (p.z > 0) {
        if (msSinceStart < PLANET_APPEAR_TIME) {
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

  update(msSinceLastFrame: number, msSinceStart: number) {

    this.handlePlanet(msSinceLastFrame, msSinceStart);
    this.handleStars(msSinceLastFrame, msSinceStart);

    this.renderer.render(this.scene, this.camera);
  }
}
