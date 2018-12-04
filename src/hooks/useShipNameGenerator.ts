import { useRef, useState } from "react";
import { useAllowUpdate } from "./useAllowUpdate";
import { useFrameEffect } from "./useFrameEffect";
import { makeRandom } from "../util/ShipName";

export const useShipNameGenerator = (offeredShipName?: string) => {
  const [nameGuess, setNameGuess] = useState('_');
  const allowUpdate = useAllowUpdate();

  let overrideTimer = useRef(null);
  let found = useRef(false);

  useFrameEffect(() => {
    if (nameGuess.trim() === offeredShipName) {
      setNameGuess(offeredShipName);
      return false;
    }

    if (!found.current) {
      setNameGuess(makeRandom(nameGuess, offeredShipName));
    }
    if (offeredShipName && !overrideTimer.current) {
      overrideTimer.current = window.setTimeout(() => {
        if (allowUpdate) {
          found.current = true;
          setNameGuess(offeredShipName);
        }
      }, 3000);
    }
    return true;
  }, [offeredShipName, nameGuess], 35);

  return {
    nameGuess: nameGuess.trim(),
  };
};
