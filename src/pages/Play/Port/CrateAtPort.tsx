import * as React from "react";
import styled from "styled-components";
import { CrateButton } from "../../../components/Atoms/HaloButton/HaloButton";
import { CratePickup } from "../../../components/Molecules/CratePickup/CratePickup";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { ICrateAction } from "../../../Interfaces";

interface ICrateAtPortProps {
  crateAction: ICrateAction;
}

const StyledCrateAtPort = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        flex: 1;
    }
`;

export const CrateAtPort = ({ crateAction }: ICrateAtPortProps) => {
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
