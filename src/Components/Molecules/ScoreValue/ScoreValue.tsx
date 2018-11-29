import * as React from "react";
import CreditsIcon from "../../Icons/CreditsIcon/CreditsIcon";
import styled from "styled-components";

interface PropsInterface {
  /** The score value to display. Note it is not an integer */
  score: string;
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
`;
const Digit = styled.span`
  :nth-last-child(3n):before {
      content: ','
  }
  :first-child:before {
    content: '';
  }
`;

/**
 * Standard way to display a score value (with Icon)
 */
export default function ScoreValue({ score, className }: PropsInterface) {
  return (
    <StyledScore className={className}>
      <Icon>
        <CreditsIcon/>
      </Icon>
      <Digits>
        {score.split("").map((digit, i) => (
          <Digit key={i}>
            {digit}
          </Digit>
        ))}
      </Digits>
    </StyledScore>
  );
}
