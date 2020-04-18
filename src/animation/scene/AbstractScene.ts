import * as THREE from "three";

export const DISTANCE_PLANE = 2500;

export abstract class AbstractScene {
  protected container: HTMLElement;
  protected height: number;
  protected width: number;

  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer;

  public initCanvas(container: HTMLElement) {
    this.container = container;
    this.updateDimensions();

    // create scene object
    this.scene = new THREE.Scene();

    // setup renderer
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

  public tearDown() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  public resize() {
    this.renderer.setSize(0, 0);
    this.updateDimensions();
    this.renderer.setSize(this.width, this.height);
    this.resetCamera();
    this.init();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * The camera is positioned in the center of the axis at 0,0.
   * X goes from Negative Left to Positive Right
   * Y goes from Negative Up to Positive Down
   * Z goes from Negative Away from Camera, Positive Toward camera
   */
  protected resetCamera() {
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 1, DISTANCE_PLANE);
    this.camera.position.set(0, 0, DISTANCE_PLANE / 2);
  }

  protected updateDimensions() {
    const { width, height } = this.container.getBoundingClientRect();
    this.width = width;
    this.height = height;
  }

  public abstract init(): void;
  public abstract tick(timeNow: number, msSinceLastFrame: number, msSinceStart: number): void;
}
