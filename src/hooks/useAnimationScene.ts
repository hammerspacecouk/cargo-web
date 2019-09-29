import { RefObject, useEffect, useRef } from "react";
import { IScene } from "../animation/utils/AbstractScene";

type UseAnimationSceneType<T extends HTMLElement> = RefObject<T>;

export const useAnimationScene = <T extends HTMLElement>(Scene: IScene): UseAnimationSceneType<T> => {
  const canvasRef = useRef<T>();

  useEffect(() => {
    let animationFrame: number;
    canvasRef.current.style.width = '100%';
    canvasRef.current.style.height= '100%';

    const scene = new Scene(canvasRef.current);

    const render = (time: number) => {
      scene.update(time);
      animationFrame = requestAnimationFrame(render);
    };

    const onResize = () => {
      scene.resize();
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
