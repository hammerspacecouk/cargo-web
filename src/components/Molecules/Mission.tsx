import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { SIZES } from "@src/styles/typography";
import { H3 } from "@src/components/Atoms/Heading";
import { CheckboxChecked } from "@src/components/Icons/CheckboxCheckedIcon";
import { CheckboxEmpty } from "@src/components/Icons/CheckboxEmptyIcon";
import * as React from "react";
import { IMission } from "@src/interfaces";

export const Mission = ({ mission }: { mission: IMission }) => (
  <StyledMission achieved={!!mission.collectedAt}>
    <Check>{mission.collectedAt ? <CheckboxChecked /> : <CheckboxEmpty />}</Check>
    <Name>{mission.name}</Name>
    <Description>{mission.description}</Description>
  </StyledMission>
);

export const StyledMission = styled.div<{ achieved?: boolean }>`
  width: 100%;
  min-height: 112px;
  border-radius: ${GRID.UNIT};
  background: ${COLOURS.GREY.DARKEST};
  padding: ${GRID.UNIT};
  border: solid 1px ${({ achieved }) => (achieved ? COLOURS.SEMANTIC.OK.KEY : COLOURS.GREY.MID)};
  ${({ achieved }) => !achieved && `opacity: 0.6`};
`;
const Check = styled.span`
  display: inline-block;
  width: 32px;
  margin: 0 0 ${GRID.UNIT} ${GRID.UNIT};
  float: right;
`;
const Name = styled(H3)`
  margin-bottom: ${GRID.HALF};
`;
export const Description = styled.p`
  ${SIZES.F};
`;
