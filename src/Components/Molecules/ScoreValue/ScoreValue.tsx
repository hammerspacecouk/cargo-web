import * as React from "react";
import CreditsIcon from "../../Icons/CreditsIcon/CreditsIcon";
import styled from "styled-components";
import { MONOSPACE_FONT } from "../../../styles/typography";

interface PropsInterface {
  score: number;
  className?: string;
}

const StyledScore = styled.div`
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;
const Digits = styled.span`
  display: inline-block;
  ${MONOSPACE_FONT}
`;

/**
 * Standard way to display a score value (with Icon)
 */
export default function ScoreValue({ score, className }: PropsInterface) {
  return (
    <StyledScore className={className}>
      <Icon>
        <CreditsIcon />
      </Icon>
      <Digits>
        {score.toLocaleString()}
      </Digits>
    </StyledScore>
  );
}
