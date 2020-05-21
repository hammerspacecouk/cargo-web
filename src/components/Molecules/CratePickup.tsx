import * as React from "react";
import styled from "styled-components";
import { ICrateAction } from "@src/interfaces";
import { GRID } from "@src/styles/variables";
import { CrateWithContents } from "@src/components/Atoms/CrateContents";
import { Icon, SMALL_ICON } from "@src/components/Atoms/Icon";
import { TextE } from "@src/components/Atoms/Text";
import { CreditsIcon } from "@src/components/Icons/CreditsIcon";
import { useNumber } from "@src/hooks/useNumber";

interface IProps {
  crateAction: ICrateAction;
}

export const StyledCrate = styled.span`
  min-width: 144px;
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
      <CrateWithContents crate={crateAction.crate} />
      <StyledCrateValue>
        <StyledValue>+{crateValue}</StyledValue>
        <Icon size={SMALL_ICON}>
          <CreditsIcon />
        </Icon>
        <abbr title="per light year">/ly</abbr>
      </StyledCrateValue>
    </StyledCrate>
  );
});
