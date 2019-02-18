import styled from "styled-components";
import { GRID, MAX_CONTENT_WIDTH } from "../../../styles/variables";
import { BREAKPOINTS } from "../../../styles/media";


export const MaxContentArea = styled.div`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  ${BREAKPOINTS.M`
    padding: 0 ${GRID.UNIT};
  `}
`;
