import styled from "styled-components";
import { MASTHEAD_HEIGHT } from "../../styles/variables";
import { BREAKPOINTS } from "../../styles/media";

export const JumpLink = styled.div`
  // so that the anchor jumps to the right place
  margin-top: -${MASTHEAD_HEIGHT};
  padding-top: ${MASTHEAD_HEIGHT};
  ${BREAKPOINTS.M`
    margin-top: 0;
    padding-top: 0;
  `};
`;
