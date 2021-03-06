import { RefObject, useEffect, useRef } from "react";
import { AbstractScene } from "@src/animation/scene/AbstractScene";

type UseAnimationSceneType<T extends HTMLElement> = RefObject<T>;

export const useAnimationScene = <T extends HTMLElement>(
  Scene: AbstractScene,
  watch: any[]
): UseAnimationSceneType<T> => {
  const canvasRef = useRef<T>();

  useEffect(() => {
    let animationFrame: number;
    let debounceTimer: number;
    let startTime: number;
    let lastTime: number;

    Scene.initCanvas(canvasRef.current);

    const render = (time: number) => {
      if (!startTime) {
        startTime = time;
      }
      const msSinceLastFrame = lastTime ? time - lastTime : 0;
      const msSinceStart = time - startTime;
      lastTime = time;

      try {
        Scene.tick(Date.now(), msSinceLastFrame, msSinceStart);
      } catch (e) {
        // any errors. tear it down and start again
        console.error("Animation failed. Rebuilding", e); // todo - perhaps refresh the page if it keeps happening
        Scene.tearDown();
        Scene.initCanvas(canvasRef.current);
      }
      animationFrame = requestAnimationFrame(render);
    };

    const onResize = () => {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => Scene.resize(), 200);
    };

    window.addEventListener("resize", onResize);
    requestAnimationFrame(render); // start

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(animationFrame);
      Scene.tearDown();
    };
  }, watch);

  return canvasRef;
};
