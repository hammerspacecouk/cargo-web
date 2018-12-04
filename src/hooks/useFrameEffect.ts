import { useEffect } from "react";

export const useFrameEffect = (
  frameCallback: (frameTime: number) => boolean,
  watch: any[] = [],
  minimumWait: number = 0
) => {
  // to prevent attempts to update state once unmounted
  let startTime: number = null;
  let frameHandler: number = null;
  let lastHandledFrameTime = 0;

  const frame = (frameTime: number) => {
    if (!startTime) {
      startTime = frameTime;
      lastHandledFrameTime = frameTime;
    }
    const totalTimePassword = frameTime - startTime;
    const timeSinceLast = frameTime - lastHandledFrameTime;
    if (timeSinceLast < minimumWait) {
      // if we have to wait a minimum time, skip this render and make another
      frameHandler = window.requestAnimationFrame(frame);
      return;
    }
    lastHandledFrameTime = frameTime;
    if (frameCallback(totalTimePassword)) {
      frameHandler = window.requestAnimationFrame(frame);
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(frameHandler);
    };
  }, watch);
};
