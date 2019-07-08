import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ListUnstyled } from "../../../Atoms/List/ListUnstyled";
import * as React from "react";
import { EffectDetail } from "../../../Molecules/EffectDetail";

export const Bonus = () => {
  const { bonusEffects } = useActiveShipContext();

  return (
    <ListUnstyled>
      {bonusEffects.map(bonus => (
        <li key={`bonus-${bonus.id}`}>
          <EffectDetail effect={bonus} />
        </li>
      ))}
    </ListUnstyled>
  );
};
