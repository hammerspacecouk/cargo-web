import { useEffect, useRef } from "react";

export const useFrameEffect = (
  frameCallback: (frameTime: number) => boolean,
  watch: any[] = [],
  minimumWait: number = 0
) => {
  // to prevent attempts to update state once unmounted
  const allowUpdate = useRef(false);
  const startTime = useRef(null);
  const lastHandledFrameTime = useRef(0);

  const frame = (frameTime: number) => {
    if (!allowUpdate.current) {
      return;
    }
    if (!startTime.current) {
      startTime.current = frameTime;
      lastHandledFrameTime.current = frameTime;
    }
    const totalTimePassword = frameTime - startTime.current;
    const timeSinceLast = frameTime - lastHandledFrameTime.current;
    if (timeSinceLast < minimumWait) {
      // if we have to wait a minimum time, skip this render and make another
      window.requestAnimationFrame(frame);
      return;
    }
    lastHandledFrameTime.current = frameTime;
    if (frameCallback(totalTimePassword)) {
      window.requestAnimationFrame(frame);
    }
  };

  useEffect(() => {
    allowUpdate.current = true;
    window.requestAnimationFrame(frame);
    return () => {
      allowUpdate.current = false;
    };
  }, watch);
};
