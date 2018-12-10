import * as React from "react";
import Status from "../../Navigation/Status";
import styled, { keyframes } from "styled-components";
import { GRID } from "../../../styles/variables";
import { H1 } from "../../Atoms/Heading/Heading";
import { P } from "../../Atoms/Text/Text";

export interface ErrorProps {
  code?: number;
  message?: string;
}

const jiggle = keyframes`
  0% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(-3deg);
  }
`;

const StyledError = styled.div`
  display: block;
  max-width: 524px; // todo - variable
  margin: 0 auto;
  padding: ${GRID.DOUBLE} ${GRID.UNIT};
  text-align: center;
`;

const StyledTitle = styled(H1)`
  margin-bottom: ${GRID.DOUBLE};
  animation: ${jiggle} 0.2s infinite;
`;

export const Error = (props: ErrorProps) => {
  const code = props.code || 500;
  const msg = props.message || "An error occurred. Sorry about that";

  return (
    <Status code={code}>
      <StyledError>
        <StyledTitle>{code}</StyledTitle>
        <P>{msg}</P>
      </StyledError>
    </Status>
  );
};
