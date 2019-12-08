import React, {RefObject} from "react";

export const useElementDimensions = (): IElementDimensions => {
  const ref = React.useRef<HTMLElement>();
  const [sizes, setSizes] = React.useState<{ width?: number, height?: number }>({width: null, height: null});
  let debounceTimer: number;

  const findSizes = () => {
    if (ref.current) {
      const {width, height} = ref.current.getBoundingClientRect();
      setSizes({width, height});
    } else {
      setSizes({
        width: null,
        height: null,
      });
    }
  };

  const onResize = () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(findSizes, 200);
  };

  React.useEffect(() => {
    findSizes();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [ref.current]);

  return {
    ref,
    sizeIsKnown: sizes.width !== null,
    height: sizes.height,
    width: sizes.width
  }
};

interface IElementDimensions {
  ref: RefObject<any>;
  sizeIsKnown: boolean;
  height?: number;
  width?: number;
}
