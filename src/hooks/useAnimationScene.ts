import { RefObject, useEffect, useRef } from "react";
import { IScene } from "../animation/utils/AbstractScene";

type UseAnimationSceneType<T extends HTMLElement> = RefObject<T>;

export const useAnimationScene = <T extends HTMLElement>(Scene: IScene): UseAnimationSceneType<T> => {
  const canvasRef = useRef<T>();

  useEffect(() => {
    let animationFrame: number;
    let debounceTimer: number;
    let startTime: number;
    let lastTime: number;
    canvasRef.current.style.width = '100%';
    canvasRef.current.style.height= '100%';

    const scene = new Scene(canvasRef.current);

    const render = (time: number) => {
      if (!startTime) {
        startTime = time;
      }
      const msSinceLastFrame = lastTime ? time - lastTime : 0;
      const msSinceStart = time - startTime;
      lastTime = time;

      scene.update(msSinceLastFrame, msSinceStart);
      animationFrame = requestAnimationFrame(render);
    };

    const onResize = () => {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => scene.resize(), 200);
    };

    window.addEventListener('resize', onResize);
    requestAnimationFrame(render); // start

    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(animationFrame);
    }
  }, []);

  return canvasRef;
};
