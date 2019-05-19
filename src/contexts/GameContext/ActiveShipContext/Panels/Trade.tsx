import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";
import { IEffect, IEffectUpgrade } from "../../../../Interfaces";
import styled from "styled-components";
import { GRID } from "../../../../styles/variables";
import { TokenButton } from "../../../../components/Molecules/TokenButton/TokenButton";
import { ActionButton } from "../../../../components/Atoms/Button/Button";
import { H4 } from "../../../../components/Atoms/Heading/Heading";
import { CreditsButton } from "../../Components/CreditsButton";
import { PANEL_INNER_DIVIDER_BORDER } from "../../../../styles/colours";

const EffectsList = styled.ul`
    border-top: ${PANEL_INNER_DIVIDER_BORDER};
`;

const EffectsListItem = styled.li`
    display: flex;
    align-items: center;
    padding: ${GRID.UNIT} 0;
    border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
`;

const EffectSymbol = styled.div`
    transform: rotate(-45deg);
    width: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 1.2rem;
    margin-right: 16px;
`;

const EffectDetail = styled.div`
    flex: 1;
`;

const EffectButton = styled.div`

`;

const getSymbol = (effect: IEffect) => {
  return effect.name.substr(0, 2);
};


const Effect = ({ buttonsDisabled, effect }: { buttonsDisabled: boolean, effect: IEffectUpgrade }) => {
  if (!effect) {
    return <EffectsListItem>LOCKED</EffectsListItem>;
  }

  let tokenButton = <ActionButton disabled={true}>SSS</ActionButton>;
  if (effect.actionToken) {
    tokenButton = (
      <TokenButton token={effect.actionToken} handler={() => alert('sds')}>
        <CreditsButton
          amount={effect.cost}
          disabledOverride={buttonsDisabled}
        />
      </TokenButton>
    );
  }

  return (
    <EffectsListItem>
      <EffectSymbol>{getSymbol(effect.detail)}</EffectSymbol>
      <EffectDetail>
        <H4 as="h3">{effect.detail.name}</H4>
        <p>{effect.detail.description}</p>
      </EffectDetail>
      <EffectButton>
        {tokenButton}
      </EffectButton>
    </EffectsListItem>
  );

};

const Effects = ({ buttonsDisabled, effects }: { buttonsDisabled: boolean, effects: IEffectUpgrade[] }) => {
  return (
    <EffectsList>
      {effects.map((effect, i) => (
        <Effect
          key={(effect && effect.detail) ? effect.detail.id : i}
          buttonsDisabled={buttonsDisabled}
          effect={effect}
        />
      ))}
    </EffectsList>
  )
};

export const Trade = () => {
  const { purchaseOptions, buttonsDisabled } = useActiveShipContext();
  if (!purchaseOptions) {
    return null;
  }

  return (
    <Effects buttonsDisabled={buttonsDisabled} effects={purchaseOptions}/>
  );
};
