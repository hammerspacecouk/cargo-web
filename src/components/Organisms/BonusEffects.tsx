import * as React from "react";
import { IEffect } from "../../interfaces";
import { TextCenter } from "../Atoms/Text";
import { EffectsRow } from "./EffectsRow";
import { Effect } from "../Molecules/Effect";

interface IProps {
  effects?: IEffect[];
}

export const BonusEffects = React.memo(({ effects }: IProps) => {
  if (effects === undefined || effects.length === 0) {
    return null;
  }
  return (
    <>
      <TextCenter as="h3">BONUS EARNED</TextCenter>
      <EffectsRow>
        {effects.map((effect) => (
          <Effect key={effect.name} effect={effect} />
        ))}
      </EffectsRow>
    </>
  );
});
