import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";
import styled from "styled-components";
import { GRID } from "../../../../styles/variables";

const StyledOverview = styled.div`
    padding: ${GRID.DOUBLE};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ShipOverview = () => {
  const {ship} = useActiveShipContext();
  return (
    <StyledOverview>Overview of {ship.name}</StyledOverview>
  )
};
