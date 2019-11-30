import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { EffectDetail } from "./EffectDetail";
import { IEffect, IEffectPurchase, ILockedTransaction } from "../../interfaces";
import { TokenButton } from "./TokenButton";
import { CreditsButton } from "./CreditsButton";
import styled from "styled-components";
import { ButtonRow } from "./ButtonRow";
import * as React from "react";
import { TextF, TextWarning } from "../Atoms/Text";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { getEffectColour } from "../Atoms/EffectSymbol";

export const EffectPurchase = ({ option }: { option: IEffectPurchase | ILockedTransaction }) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  if ((option as ILockedTransaction).requirement) {
    return (
      <EffectPane>
        <TextF as="div">
          <TextWarning>{(option as ILockedTransaction).requirement}</TextWarning>
        </TextF>
      </EffectPane>
    );
  }

  const effect = (option as IEffectPurchase).detail;
  const transaction = option as IEffectPurchase;

  return (
    <EffectPane effect={effect}>
      <DetailCell>
        <EffectDetail effect={effect} />
      </DetailCell>
      <StyledButtonRow>
        <TokenButton token={transaction.actionToken} handler={portActionHandler}>
          <CreditsButton amount={transaction.cost} disabledOverride={buttonsDisabled} />
        </TokenButton>
      </StyledButtonRow>
    </EffectPane>
  );
};

// todo - de-duplicate other usages
const EffectPane = styled.div<{ effect?: IEffect }>`
  padding: ${GRID.UNIT};
  border: solid 1px ${COLOURS.GREY.BLACK};
  background: ${COLOURS.GREY.DARKEST};
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  border-top-color: ${getEffectColour};
`;

const DetailCell = styled.div`
  width: 100%;
  flex: 1;
`;

const StyledButtonRow = styled(ButtonRow)`
  justify-content: center;
`;
