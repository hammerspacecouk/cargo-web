import { useEffect, useRef } from "react";

export const useFrameEffect = (
  frameCallback: (frameTime: number) => boolean,
  watch: any[] = [],
  minimumWait: number = 0,
  unmount?: () => void
) => {
  const mounted = useRef(false);
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
    if (mounted.current && frameCallback(totalTimePassword)) {
      frameHandler = window.requestAnimationFrame(frame);
    }
  };

  useEffect(() => {
    mounted.current = true;
    window.requestAnimationFrame(frame);
    return () => {
      mounted.current = false;
      window.cancelAnimationFrame(frameHandler);
      if (unmount) {
        unmount();
      }
    };
  }, watch);
};
