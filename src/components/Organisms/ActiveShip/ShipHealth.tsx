import * as React from "react";
import styled from "styled-components";
import { CreditsButton } from "../../Molecules/CreditsButton";
import { TokenButton } from "../../Molecules/TokenButton";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";
import { GRID } from "../../../styles/variables";
import { SIZES } from "../../../styles/typography";

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${GRID.UNIT};
`;

const StyledLabel = styled.div`
  flex: 1;
  margin-right: ${GRID.UNIT};
  ${SIZES.D};
`;

export const ShipHealth = () => {
  const { buttonsDisabled, applyHealthHandler, healthOptions } = useActiveShipContext();

  if (!healthOptions) {
    return null;
  }

  return (
    <>
      {healthOptions.map(transaction => {
        let button = (
          <CreditsButton amount={transaction.cost} disabledOverride={buttonsDisabled || !transaction.actionToken} />
        );

        if (transaction.actionToken) {
          button = (
            <TokenButton key={transaction.detail} token={transaction.actionToken} handler={applyHealthHandler}>
              {button}
            </TokenButton>
          );
        }

        return (
          <StyledRow key={transaction.detail}>
            <StyledLabel>Repair {transaction.detail}</StyledLabel>
            {button}
          </StyledRow>
        );
      })}
    </>
  );
};
