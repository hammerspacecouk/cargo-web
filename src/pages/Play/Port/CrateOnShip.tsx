import * as React from "react";
import styled from "styled-components";
import { PlaceholderContents } from "../../../components/Atoms/CrateContents/CrateContents";
import { CrateButton } from "../../../components/Atoms/HaloButton/HaloButton";
import {
  CratePickup,
  StyledCrate,
} from "../../../components/Molecules/CratePickup/CratePickup";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { ICrateAction } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";

interface ICrateOnShipProps {
  crateAction: ICrateAction;
}

const StyledCrateOnShip = styled.div`
    display: flex;
    > * {
        flex: 1;
    }
`;

const StyledPlaceholder = styled.div`
  padding: ${GRID.HALF};
  display: flex;
  align-items: center;
`;

export const CrateOnShip = ({ crateAction }: ICrateOnShipProps) => {
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
