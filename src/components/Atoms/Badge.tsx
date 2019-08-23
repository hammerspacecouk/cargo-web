import { css, keyframes } from "styled-components";
import styled from "styled-components";
import { COLOURS } from "../../styles/colours";
import { GRID } from "../../styles/variables";

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

export const Badge = styled.span<{ animate?: boolean }>`
  display: inline-block;
  background: ${COLOURS.WHITE.STANDARD};
  color: ${COLOURS.BLACK.STANDARD};
  border-radius: ${GRID.DOUBLE};
  line-height: ${GRID.UNIT};
  font-size: 12px;
  font-weight: bold;
  padding: 0 ${GRID.QUARTER};
  min-width: ${GRID.UNIT};
  text-align: center;
  box-shadow: 1px 1px 8px black;
  ${({ animate }) =>
    animate
      ? css`
          animation: ${frames} 0.6s ease-out 1;
        `
      : ""}
`;
