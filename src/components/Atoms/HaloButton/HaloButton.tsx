import styled from "styled-components";
import { GRID } from "../../../styles/variables";

export const HaloButton = styled.button`
  outline: none;
  display: inline-block;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  border-radius: 50%;
  padding: ${GRID.HALF};

  &:not([disabled]) {
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.2);
    }
    &:active {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0.98);
    }
  }
  &[disabled] {
    opacity: 0.4;
  }
`;

export const CrateButton = styled(HaloButton)`
  border-radius: 0;
`;
