import styled, { css, keyframes } from "styled-components";
import { COLOURS } from "../../../styles/colours";

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
  animation: ${frames} 2s ease-in-out;
`;

export default styled.div`
  display: block;
  background: ${COLOURS.BODY.FADED};
  opacity: 0.2;
  border-radius: 2px;
  ${animate};
`;
