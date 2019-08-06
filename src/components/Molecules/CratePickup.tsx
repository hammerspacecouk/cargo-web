import * as React from "react";
import styled from "styled-components";
import { ICrateAction } from "../../interfaces";
import { GRID } from "../../styles/variables";
import { CrateWithContents } from "../Atoms/CrateContents";
import { Icon, SMALL_ICON } from "../Atoms/Icon";
import { TextE } from "../Atoms/Text";
import { CreditsIcon } from "../Icons/CreditsIcon";
import { useNumber } from "../../hooks/useNumber";

interface IProps {
  crateAction: ICrateAction;
}

export const StyledCrate = styled.span`
  width: 144px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
`;
const StyledCrateValue = styled.span`
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

export const CratePickup = React.memo(({ crateAction }: IProps) => {
  const crateValue = useNumber(crateAction.valuePerLY);

  return (
    <StyledCrate>
      <CrateWithContents crate={crateAction.crate}/>
      <StyledCrateValue>
        <StyledValue>+{crateValue}</StyledValue>
        <Icon size={SMALL_ICON}>
          <CreditsIcon/>
        </Icon>
        <abbr title="per light year">/ly</abbr>
      </StyledCrateValue>
    </StyledCrate>
  );
});
