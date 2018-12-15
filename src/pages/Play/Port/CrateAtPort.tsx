import * as React from "react";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import TokenButton from "../../../components/Molecules/TokenButton/TokenButton";
import CreditsIcon from "../../../components/Icons/CreditsIcon/CreditsIcon";
import Icon, { SMALL_ICON } from "../../../components/Atoms/Icon/Icon";
import { TextE } from "../../../components/Atoms/Text/Text";
import { CrateWithContents } from "../../../components/Atoms/CrateContents/CrateContents";
import styled from "styled-components";
import HaloButton from "../../../components/Atoms/HaloButton/HaloButton";
import { GRID } from "../../../styles/variables";

interface CrateAtPortPropsInterface {
  crateAction: CrateActionInterface;
}

const StyledCrateAtPort = styled.div``;

const CrateButton = styled(HaloButton)`
    border-radius: ${GRID.HALF};
`;

const StyledCrate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;
const StyledCrateValue = styled.div`
    text-align: center;
    margin-top: ${GRID.QUARTER};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledValue = styled(TextE)`
    margin-right: ${GRID.QUARTER};
`;

export const CrateAtPort = ({ crateAction }: CrateAtPortPropsInterface) => {
  const { buttonsDisabled, moveCrate } = usePlayPortContext();

  const CrateContent = (
    <StyledCrate>
      <CrateWithContents crate={crateAction.crate} />
      <StyledCrateValue>
        <StyledValue>+{crateAction.valuePerLY.toLocaleString()}</StyledValue>
        <Icon size={SMALL_ICON}>
          <CreditsIcon />
        </Icon><abbr title="per light year">/ly</abbr>
      </StyledCrateValue>
    </StyledCrate>
  );

  let tokenButton = (
    <CrateButton disabled={true}>
      {CrateContent}
    </CrateButton>
  );
  if (crateAction.token) {
    tokenButton = (
      <TokenButton token={crateAction.token} handler={moveCrate}>
        <CrateButton type="submit" disabled={buttonsDisabled}>
          {CrateContent}
        </CrateButton>
      </TokenButton>
    );
  }

  return (
    <StyledCrateAtPort>
      {tokenButton}
    </StyledCrateAtPort>
  );
};
