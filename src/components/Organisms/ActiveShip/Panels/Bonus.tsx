import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ListUnstyled } from "../../../Atoms/List/ListUnstyled";
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
