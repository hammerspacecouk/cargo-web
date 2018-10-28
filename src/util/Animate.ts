export class SlowedAnimationFrame {
  private readonly millisecondsToWait: number = 0;
  private lastTime: number = 0;
  private readonly callback: (now?: number) => void;
  constructor(millisecondsToWait: number, callback: (now?: number) => void) {
    this.millisecondsToWait = millisecondsToWait;
    this.callback = callback;
  }

  private doFrame(now: number) {
    // if not enough frames have passed since the last time, loop round again
    if (this.lastTime && now < this.lastTime + this.millisecondsToWait) {
      window.requestAnimationFrame(this.doFrame.bind(this));
      return;
    }
    this.lastTime = now;
    this.callback(now);
  }

  frame() {
    window.requestAnimationFrame(this.doFrame.bind(this));
  }
}
