import * as React from "react";
import { CreditsButton } from "../../../components/Molecules/CreditsButton/CreditsButton";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { useUpgradesContext } from "../../../context/Page/UpgradesContext";
import { IEffectUpgrade } from "../../../Interfaces";
import { Effect } from "../../../components/Molecules/Effect/Effect";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { H4 } from "../../../components/Atoms/Heading/Heading";

interface IProps {
  effect?: IEffectUpgrade;
}

const StyledEffectUpgrade = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
`;

const StyledEffectWrap = styled.div`
  width: 64px;
  margin-right: ${GRID.UNIT};
`;

const StyledEffectDetail = styled.div`
  flex: 1;
`;

const Description = styled.p`
  margin: ${GRID.HALF} 0 ${GRID.UNIT};
`;

export const EffectUpgrade = ({ effect }: IProps) => {
  const { buttonsDisabled, makePurchase } = useUpgradesContext();

  let purchaseButton = null;
  let title = null;
  let description = null;

  if (effect) {
    title = <H4 as="h3">{effect.detail.name}</H4>;
    description = <Description>{effect.detail.description}</Description>;

    if (effect.actionToken) {
      purchaseButton = (
        <TokenButton token={effect.actionToken} handler={makePurchase}>
          <CreditsButton
            amount={effect.cost}
            disabledOverride={buttonsDisabled}
          />
        </TokenButton>
      );
    }
  }

  return (
    <StyledEffectUpgrade>
      <StyledEffectDetail>
        {title}
        {description}
        {purchaseButton}
      </StyledEffectDetail>
      <StyledEffectWrap>
        <Effect
          effect={effect && effect.detail}
          count={effect && effect.currentCount}
        />
      </StyledEffectWrap>
    </StyledEffectUpgrade>
  );
};
