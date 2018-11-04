import { useEffect, useRef } from "react";

export const useFrameEffect = (frameCallback: () => boolean, watch = []) => {
  // to prevent attempts to update state once unmounted
  const allowUpdate = useRef(false);
  const startTime = useRef(null);

  const frame = (frameTime) => {
    if (!allowUpdate.current) {
      return;
    }
    if (!startTime.current) {
      startTime.current = frameTime;
    }
    const timePassed = frameTime - startTime.current;
    if (frameCallback(timePassed)) {
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
