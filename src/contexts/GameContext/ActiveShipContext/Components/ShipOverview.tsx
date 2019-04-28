import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";
import styled  from "styled-components";
import { GRID } from "../../../../styles/variables";

import { Planet } from "../../../../components/Molecules/Planet/Planet";
import { Environment } from "../../../../util/Environment";
import { ELEMENTS, SIZES } from "../../../../styles/typography";

const shipSize = '128px';

const StyledOverview = styled.div`
    display: block;
    min-height: 300px;
    padding: ${GRID.UNIT} calc(${shipSize} + ${GRID.UNIT}) ${GRID.UNIT} ${GRID.UNIT};
    position: relative;
    overflow:hidden;
`;

const PlanetPosition = styled.div`
    position: absolute;
    top: 108px;
    right: 240px;
    width: 364px;
    height: 364px;
    pointer-events: none;
    transform: rotate(-45deg);
`;

const Ship = styled.div`
    width: ${shipSize};
    position: absolute;
    top: ${GRID.UNIT};
    right: ${GRID.UNIT};
`;

const TitleName = styled.span`
    ${ELEMENTS.H3};
    font-size: ${SIZES.D};
`;

const TitleConjunction = styled.span`
    ${ELEMENTS.H6};
`;

const TitleLocation = styled.span`
    ${ELEMENTS.H1};
    display: block;
    margin-top: ${GRID.UNIT};
`;

export const ShipOverview = () => {
  const {ship} = useActiveShipContext();
  return (
    <StyledOverview>
      <PlanetPosition>
        <Planet />
      </PlanetPosition>
      <div>
        <h1>
          <TitleName>{ship.name}</TitleName>
          <TitleConjunction> arrived at </TitleConjunction>
          <TitleLocation>{ship.location.name}</TitleLocation>
        </h1>
      </div>
      <Ship>
        <img
          src={`${Environment.apiHostname}${ship.shipClass.image}`}
          alt={`${ship.name} (${ship.shipClass.name})`}
        />
      </Ship>
    </StyledOverview>
  )
};
