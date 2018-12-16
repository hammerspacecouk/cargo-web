import * as React from "react";
import styled from "styled-components";
import { CrateWithContents } from "../../Atoms/CrateContents/CrateContents";
import Icon, { SMALL_ICON } from "../../Atoms/Icon/Icon";
import CreditsIcon from "../../Icons/CreditsIcon/CreditsIcon";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import { GRID } from "../../../styles/variables";
import { TextE } from "../../Atoms/Text/Text";

interface PropsInterface {
  crateAction: CrateActionInterface;
}

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

export const CratePickup = ({ crateAction }: PropsInterface) => (
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
