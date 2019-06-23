import * as React from "react";
import styled from "styled-components";
import { MONOSPACE_FONT } from "../../styles/typography";
import { CreditsIcon } from "../Icons/CreditsIcon";

interface IProps {
  score: number;
  prefix?: string;
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

const getScoreString = (input: number): string => {
  if (input > 999999999999999) {
    return input.toExponential(12);
  }
  return input.toLocaleString();
};

/**
 * Standard way to display a score value (with Icon)
 */
export const ScoreValue = ({ score, prefix = "", className }: IProps) => {
  return (
    <StyledScore className={className}>
      <Icon>
        <CreditsIcon />
      </Icon>
      <Digits>
        {prefix}
        {getScoreString(score)}
      </Digits>
    </StyledScore>
  );
};
