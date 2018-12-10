import styled from "styled-components";
import { GRID } from "../../../styles/variables";

export default styled.button`
  outline: none;
  display: inline-block;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  border-radius: 50%;
  padding: ${GRID.HALF};
  :hover,
  :focus {
    background: rgba(255, 255, 255, 0.2);
  }
  :active {
    background: rgba(255, 255, 255, 0.4);
  }
`;
