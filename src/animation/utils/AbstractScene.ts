export abstract class AbstractScene {
  protected container: HTMLElement;
  protected height: number;
  protected width: number;

  constructor(container: HTMLElement) {
    this.container = container;
    this.updateDimensions();
  }

  updateDimensions() {
    const {width, height} = this.container.getBoundingClientRect();
    this.width = width;
    this.height = height;
  }

  abstract resize(): void;
  abstract update(msSinceLastFrame: number, msSinceStart: number): void;
}

type Scene = typeof AbstractScene;
export interface IScene extends Scene {}
