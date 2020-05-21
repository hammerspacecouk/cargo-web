import * as React from "react";
import { IEffect } from "@src/interfaces";
import { TextCenter } from "@src/components/Atoms/Text";
import { EffectsRow } from "./EffectsRow";
import { Effect } from "@src/components/Molecules/Effect";

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
