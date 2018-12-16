import * as React from "react";
import styled from "styled-components";
import TokenButton from "../../../components/Molecules/TokenButton/TokenButton";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { CratePickup } from "../../../components/Molecules/CratePickup/CratePickup";
import { CrateButton } from "../../../components/Atoms/HaloButton/HaloButton";
import { Crate } from "../../../components/Icons/Crate/Crate";
import { GRID } from "../../../styles/variables";

interface CrateOnShipPropsInterface {
  crateAction: CrateActionInterface;
}

const StyledCrateOnShip = styled.div``;

const StyledPlaceholder = styled.div`
    padding: ${GRID.UNIT};
    width: calc(60px + (${GRID.UNIT} * 2 ));
`;

export const CrateOnShip = ({ crateAction }: CrateOnShipPropsInterface) => {
  const { buttonsDisabled, moveCrate } = usePlayPortContext();

  return (
    <StyledCrateOnShip>
      <TokenButton token={crateAction.token} handler={moveCrate}>
        <CrateButton type="submit" disabled={buttonsDisabled}>
          <CratePickup crateAction={crateAction} />
        </CrateButton>
      </TokenButton>
    </StyledCrateOnShip>
  );
};

export const CrateOnShipPlaceholder = () => {
  return (
    <StyledPlaceholder>
      <Crate colour="rgba(255,255,255, 0.3)" />
    </StyledPlaceholder>

  );
};
