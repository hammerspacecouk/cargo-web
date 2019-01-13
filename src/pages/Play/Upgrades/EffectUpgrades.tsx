import * as React from "react";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { IEffectUpgrade } from "../../../Interfaces";
import { EffectUpgrade } from "./EffectUpgrade";

interface IProps {
  effects?: IEffectUpgrade[];
}

export const EffectUpgrades = ({effects}: IProps): JSX.Element => {
  if (effects === undefined) {
    return <Loading />; // todo - nice loading state
  }

  return (
    <ul>
      {effects.map((effect, index) => (
        <li key={`effect-upgrades-${index}`}>
          <EffectUpgrade effect={effect} />
        </li>
      ))}
    </ul>
  );
};
