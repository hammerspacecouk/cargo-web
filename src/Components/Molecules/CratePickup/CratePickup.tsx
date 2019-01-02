import * as React from "react";
import styled from "styled-components";
import { ICrateAction } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";
import { CrateWithContents } from "../../Atoms/CrateContents/CrateContents";
import { Icon, SMALL_ICON } from "../../Atoms/Icon/Icon";
import { TextE } from "../../Atoms/Text/Text";
import CreditsIcon from "../../Icons/CreditsIcon/CreditsIcon";

interface IProps {
  crateAction: ICrateAction;
}

export const StyledCrate = styled.div`
  width: 144px;
  display: flex;
  align-items: start;
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

export const CratePickup = ({ crateAction }: IProps) => (
  <StyledCrate>
    <CrateWithContents crate={crateAction.crate} />
    <StyledCrateValue>
      <StyledValue>+{crateAction.valuePerLY.toLocaleString()}</StyledValue>
      <Icon size={SMALL_ICON}>
        <CreditsIcon />
      </Icon>
      <abbr title="per light year">/ly</abbr>
    </StyledCrateValue>
  </StyledCrate>
);
