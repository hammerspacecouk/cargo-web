import { AbstractScene } from "./utils/AbstractScene";
import * as THREE from "three";

interface IStar extends THREE.Vector3 {
  velocity?: number
}

export class Intro extends AbstractScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private starGeo: THREE.Geometry;
  private stars: THREE.Points;
  private planet: THREE.Mesh;

  private startTime: number;
  private lastTime: number;
  private accelerationPerSecond = 1.2;
  // private rotationPerSecond = 0.032;

  constructor(container: HTMLElement) {
    super(container);
    this.init();
  }

  init() {
    //create scene object
    this.scene = new THREE.Scene();
    this.setupCamera();
    this.createStars();
    this.createPlanet();

    //setup renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
  }

  setupCamera() {
    //setup camera with facing upward
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, 1000);
    this.camera.position.x = this.width / 2;
    this.camera.position.y = this.height / 2;
    this.camera.position.z = 1;
  }

  createPlanet() {
    this.scene.add(new THREE.AmbientLight(0x141414));

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-(this.width / 2), (this.height / 2), 100);
    this.scene.add(light);

    this.planet = new THREE.Mesh(
      new THREE.SphereGeometry(50, 32, 32),
      new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load("/planet.jpg")
      })
    );

    this.planet.position.set(this.width / 2, this.height / 2, -250);
    this.scene.add(this.planet);
  }

  createStars() {
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

    let sprite = new THREE.TextureLoader().load("/star.png");
    let starMaterial = new THREE.PointsMaterial({
      size: 0.7,
      map: sprite,
      transparent: true
    });

    this.stars = new THREE.Points(this.starGeo, starMaterial);
    this.scene.add(this.stars);
  }

  resize() {
    this.updateDimensions();
    this.setupCamera();
    this.renderer.setSize(this.width, this.height);
  }

  update(time: number) {
    if (!this.startTime) {
      this.startTime = time;
    }
    const timeSinceLastFrame = Math.min(this.lastTime ? time - this.lastTime : 0, 500);
    const timeSinceStart = time - this.startTime;
    const acceleration = ((this.accelerationPerSecond / 1000) * timeSinceLastFrame);
    // const rotation = ((this.rotationPerSecond / 1000) * timeSinceLastFrame);

    const spinTime = 200 * 1000;
    const planetRotation = ((timeSinceLastFrame % spinTime) / spinTime) * (Math.PI * 2);
    this.planet.rotateY(planetRotation);
    if (timeSinceStart > 5000 && timeSinceStart < 10000) {
      // this.planet.translateZ(10);
    }

    this.starGeo.vertices.forEach((p: IStar) => {
      if (p.z > 0) {
        // if (timeSinceStart < 5000) {
          p.z = - (500 - (Math.random() * 50));
          p.velocity = 0;
        // }
      } else {
        p.velocity += acceleration;
        p.z += p.velocity;
      }
    });
    this.starGeo.verticesNeedUpdate = true;
    // this.stars.rotation.z -= rotation;
    this.lastTime = time;
    this.renderer.render(this.scene, this.camera);
  }
}
