import * as React from "react";
import styled from "styled-components";
import { MONOSPACE_FONT } from "../../../styles/typography";
import CreditsIcon from "../../Icons/CreditsIcon/CreditsIcon";

interface IProps {
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
export const Digits = styled.span`
  display: inline-block;
  ${MONOSPACE_FONT};
`;

/**
 * Standard way to display a score value (with Icon)
 */
export const ScoreValue = ({ score, className }: IProps) => {
  return (
    <StyledScore className={className}>
      <Icon>
        <CreditsIcon />
      </Icon>
      <Digits>{score.toLocaleString()}</Digits>
    </StyledScore>
  );
};
