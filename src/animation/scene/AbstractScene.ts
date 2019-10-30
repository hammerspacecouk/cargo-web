import * as THREE from "three";

export const DISTANCE_PLANE = 2500;

export abstract class AbstractScene {

  protected container: HTMLElement;
  protected height: number;
  protected width: number;

  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer;

  initCanvas(container: HTMLElement) {
    this.container = container;
    this.updateDimensions();

    //create scene object
    this.scene = new THREE.Scene();

    //setup renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);

    this.resetCamera();
    this.init();

    // new OrbitControls( this.camera, this.renderer.domElement );
    // const axesHelper = new THREE.AxesHelper( 250 );
    // this.scene.add( axesHelper );

    // const plane = new THREE.GridHelper(100, 10);
    // this.scene.add(plane);

    this.renderer.render(this.scene, this.camera);
  }

  resetCamera() {
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, DISTANCE_PLANE);
    this.camera.position.set(0, 0, DISTANCE_PLANE / 2);
  }

  updateDimensions() {
    const { width, height } = this.container.getBoundingClientRect();
    this.width = width;
    this.height = height;
  }

  resize() {
    this.renderer.setSize(0, 0);
    this.updateDimensions();
    this.renderer.setSize(this.width, this.height);
    this.resetCamera();
    this.init();
    this.renderer.render(this.scene, this.camera);
  }

  abstract init(): void;
  abstract tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void;
}
