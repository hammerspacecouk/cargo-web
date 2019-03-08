import { css, keyframes } from "styled-components";
import styled from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";

const frames = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 1px 1px 8px black;
    }
    50% {
        transform: scale(1.25);
        box-shadow: 1px 1px 24px black;
    }
    100% {
        transform: scale(1);
        box-shadow: 1px 1px 8px black;
    }
`;

export const Badge = styled.span<{ animate?: boolean; subtle?: boolean }>`
  display: inline-block;
  background: ${({ subtle }) =>
    subtle ? COLOURS.BLACK.STANDARD : COLOURS.BASE};
  color: ${COLOURS.WHITE.STANDARD};
  border-radius: 50px;
  line-height: 24px;
  font-size: 16px;
  padding: 0 ${GRID.HALF};
  min-width: 26px;
  text-align: center;
  border: solid 1px ${COLOURS.WHITE.STANDARD};
  box-shadow: 1px 1px 8px black;
  ${({ animate }) =>
    animate
      ? css`
          animation: ${frames} 0.6s ease-out 1;
        `
      : ""}
`;
