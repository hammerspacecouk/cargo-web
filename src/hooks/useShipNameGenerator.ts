import { useRef, useState } from "react";
import { makeRandom } from "../util/ShipName";
import { useFrameEffect } from "./useFrameEffect";
import { useMounted } from "./useMounted";

export const useShipNameGenerator = (offeredShipName?: string) => {
  const [nameGuess, setNameGuess] = useState("_");
  const isMounted = useMounted();

  const overrideTimer = useRef(null);
  const found = useRef(false);

  useFrameEffect(
    () => {
      if (found.current) {
        // it's been found. stop
        return false;
      }

      setNameGuess(prev => makeRandom(prev, offeredShipName));

      if (offeredShipName && !overrideTimer.current) {
        overrideTimer.current = window.setTimeout(() => {
          if (isMounted()) {
            found.current = true;
            setNameGuess(offeredShipName);
          }
        }, 3000);
      }
      return true;
    },
    [offeredShipName],
    35,
    () => {
      if (overrideTimer.current) {
        overrideTimer.current = null;
        clearTimeout(overrideTimer.current);
      }
    }
  );

  return {
    nameGuess: nameGuess.trim(),
  };
};
