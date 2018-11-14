import { useState } from "react";
import { useAllowUpdate } from "./useAllowUpdate";
import { useFrameEffect } from "./useFrameEffect";
import { makeRandom } from "../util/ShipName";

export const useShipNameGenerator = (offeredShipName?: string) => {
  const [nameGuess, setNameGuess] = useState('');
  const [matched, setMatched] = useState(false);
  const allowUpdate = useAllowUpdate();

  let overrideTimer: number = null;

  useFrameEffect(() => {
    if (nameGuess.trim() === offeredShipName) {
      setNameGuess(offeredShipName);
      setMatched(true);
      return false;
    }

    setNameGuess(makeRandom(nameGuess, offeredShipName));
    if (offeredShipName && !overrideTimer) {
      overrideTimer = window.setTimeout(() => {
        if (allowUpdate) {
          setNameGuess(offeredShipName);
          setMatched(true);
        }
      }, 3000);
    }
    return true;
  }, [offeredShipName], 35);

  return {
    matched,
    nameGuess: nameGuess.trim(),
  };
};
