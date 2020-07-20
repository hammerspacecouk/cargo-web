import styled from "styled-components";
import { COLOURS } from "@src/styles/colours";
import { GRID } from "@src/styles/variables";

export const Input = styled.input`
  display: block;
  width: 100%;
  border-radius: 4px;
  transition: all 0.15s linear;
  border: solid 2px ${COLOURS.BUTTON.ACTION};
  padding: ${GRID.HALF};
  outline: none;
  background: ${COLOURS.BLACK.FULL};
  color: ${COLOURS.WHITE.STANDARD};
  &:focus {
    box-shadow: 0 0 32px ${COLOURS.BUTTON.ACTION}, 0 0 16px inset ${COLOURS.BUTTON.ACTION};
    text-decoration: none;
  }
`;
