import { useActiveShipContext } from "../ActiveShipContext";
import { ListUnstyled } from "../../../../components/Atoms/Lists/ListUnstyled/ListUnstyled";
import * as React from "react";

export const Bonus = () => {
  const { bonusEffects } = useActiveShipContext();

  return (
    <ListUnstyled>
      {bonusEffects.map(bonus => (
        <li key={`bonus-${bonus.id}`}>{bonus.name}</li>
      ))}
    </ListUnstyled>
  );
};
