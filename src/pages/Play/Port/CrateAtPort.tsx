import * as React from "react";
import styled from "styled-components";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import TokenButton from "../../../components/Molecules/TokenButton/TokenButton";
import { CrateButton } from "../../../components/Atoms/HaloButton/HaloButton";
import { CratePickup } from "../../../components/Molecules/CratePickup/CratePickup";

interface CrateAtPortPropsInterface {
  crateAction: CrateActionInterface;
}

const StyledCrateAtPort = styled.div``;

export const CrateAtPort = ({ crateAction }: CrateAtPortPropsInterface) => {
  const { buttonsDisabled, moveCrate } = usePlayPortContext();

  const CrateContent = <CratePickup crateAction={crateAction} />;

  let tokenButton = <CrateButton disabled={true}>{CrateContent}</CrateButton>;
  if (crateAction.token) {
    tokenButton = (
      <TokenButton token={crateAction.token} handler={moveCrate}>
        <CrateButton type="submit" disabled={buttonsDisabled}>
          {CrateContent}
        </CrateButton>
      </TokenButton>
    );
  }

  return <StyledCrateAtPort>{tokenButton}</StyledCrateAtPort>;
};
