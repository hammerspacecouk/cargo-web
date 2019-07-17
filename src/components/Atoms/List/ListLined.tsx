import styled from "styled-components";
import { PANEL_INNER_DIVIDER_BORDER } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { ListUnstyled } from "./ListUnstyled";

export const ListLined = styled(ListUnstyled)`
  border-top: ${PANEL_INNER_DIVIDER_BORDER};
  > li {
    padding: ${GRID.UNIT} 0;
    border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
  }
`;
