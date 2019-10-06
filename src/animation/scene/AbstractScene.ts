import * as THREE from "three";

export abstract class AbstractScene {

  protected distancePlane = 20000;

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
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);

    this.resetCamera();
    this.init();
    this.renderer.render(this.scene, this.camera);
  }

  resetCamera() {
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, this.distancePlane);
    this.camera.position.set(this.width / 2, this.height / 2, 1);
  }

  updateDimensions() {
    const {width, height} = this.container.getBoundingClientRect();
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
