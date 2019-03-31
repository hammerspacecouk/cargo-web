import * as React from "react";
import styled, { keyframes } from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { useMounted } from "../../../hooks/useMounted";

const loadingSize = "28px";
const loadingDuration = "1.4s";
const loadingOffset = 54;

const dashFrames = keyframes`
    0% {
      stroke-dashoffset: ${loadingOffset};
      stroke: ${COLOURS.GREY.MID};
    }
    50% {
      stroke-dashoffset: ${loadingOffset / 4};
      stroke: ${COLOURS.BASE};
      transform:rotate(135deg);
    }
    100% {
      stroke-dashoffset: ${loadingOffset};
      stroke: ${COLOURS.GREY.MID};
      transform:rotate(450deg);
    }
`;
const rotateFrames = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(270deg); }
`;

const StyledLoader = styled.div`
  width: ${loadingSize};
  height: ${loadingSize};
  margin-left: auto;
  margin-right: auto;
  transform-origin: center;
  animation: ${rotateFrames} ${loadingDuration} linear infinite;
`;

const Spinner = styled.svg`
  width: ${loadingSize};
  height: ${loadingSize};
`;

const Path = styled.circle`
  stroke: ${COLOURS.BASE};
  stroke-dasharray: ${loadingOffset};
  stroke-dashoffset: 0;
  stroke-linecap: round;
  transform-origin: center;
  animation: ${dashFrames} ${loadingDuration} ease-in-out infinite;
`;

const WAIT_TO_REVEAL = 1000;

export const Loading = () => {
  const [show, setShow] = React.useState(false);
  const checkMounted = useMounted();

  const reveal = () => {
    if (checkMounted()) {
      setShow(true);
    }
  };

  React.useEffect(() => {
    const handler = setTimeout(reveal, WAIT_TO_REVEAL);
    return () => {
      clearTimeout(handler);
    };
  }, []);

  return (
    show && (
      <StyledLoader>
        <Spinner xmlns="http://www.w3.org/2000/svg">
          <Path fill="none" strokeWidth="4" cx="14" cy="14" r="10" />
        </Spinner>
      </StyledLoader>
    )
  );
};
