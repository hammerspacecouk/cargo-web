import styled, { css, keyframes } from "styled-components";
import { COLOURS } from "@src/styles/colours";

const frames = keyframes`
    0% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0.2;
    }
`;

export const animate = css`
  animation: ${frames} 2s ease-in-out infinite;
`;

export const PlaceHolder = styled.div`
  display: block;
  background: ${COLOURS.BODY.FADED};
  opacity: 0.2;
  border-radius: 2px;
  ${animate};
`;
