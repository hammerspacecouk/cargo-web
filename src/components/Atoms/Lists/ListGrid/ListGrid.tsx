import * as React from "react";
import styled from "styled-components";
import { PANEL_INNER_DIVIDER_BORDER } from "../../../../styles/colours";

export const ListGrid = styled.ul`
  margin: -1px;
  padding: 0;
  list-style: none;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  border-top: ${PANEL_INNER_DIVIDER_BORDER};
  border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
  > li {
    margin: -1px;
    padding: 0;
    border: ${PANEL_INNER_DIVIDER_BORDER};
    flex: 1;
  }
`;
