import * as React from "react";
import styled from "styled-components";
import TokenButton from "../../../components/Molecules/TokenButton/TokenButton";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import {
  CratePickup,
  StyledCrate
} from "../../../components/Molecules/CratePickup/CratePickup";
import { CrateButton } from "../../../components/Atoms/HaloButton/HaloButton";
import { GRID } from "../../../styles/variables";
import { PlaceholderContents } from "../../../components/Atoms/CrateContents/CrateContents";

interface CrateOnShipPropsInterface {
  crateAction: CrateActionInterface;
}

const StyledCrateOnShip = styled.div``;

const StyledPlaceholder = styled.div`
  padding: ${GRID.HALF};
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
      <StyledCrate>
        <PlaceholderContents />
      </StyledCrate>
    </StyledPlaceholder>
  );
};
