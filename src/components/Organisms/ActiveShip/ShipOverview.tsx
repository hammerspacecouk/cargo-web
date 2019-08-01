import * as React from "react";
import styled from "styled-components";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";
import { GRID } from "../../../styles/variables";
import { Planet } from "../../Molecules/Planet";
import { Environment } from "../../../utils/environment";
import { ELEMENTS, SIZES } from "../../../styles/typography";
import { BREAKPOINTS } from "../../../styles/media";
import { IPort, IShip } from "../../../interfaces";
import { PortName } from "../../Molecules/PortName";

const shipSize = "128px";

const StyledOverview = styled.div`
  padding-right: calc(${shipSize} + ${GRID.UNIT});
`;

const PlanetPosition = styled.div`
  position: absolute;
  top: 108px;
  right: -160px;
  width: 364px;
  height: 364px;
  pointer-events: none;
  transform: rotate(-45deg);
  ${BREAKPOINTS.S`
    right: -96px;
  `}
  ${BREAKPOINTS.M`
    right: 16px;
  `}
  ${BREAKPOINTS.L`
    right: 96px;
  `}
  ${BREAKPOINTS.XXL`
    top: 108px;
    right: 240px;
  `}
`;

const Ship = styled.div`
  width: ${shipSize};
  position: absolute;
  top: ${GRID.UNIT};
  right: ${GRID.UNIT};
`;

const TravellingShip = styled.div`
  width: ${shipSize};
  position: absolute;
  top: ${GRID.UNIT};
  left: 50%;
  transform: translateX(-50%);
`;

const TitleName = styled.span`
  ${ELEMENTS.H3};
  ${SIZES.D};
`;

const TitleConjunction = styled.span`
  ${ELEMENTS.H6};
`;

const TitleLocation = styled.span`
  ${ELEMENTS.H1};
  display: block;
  margin-top: ${GRID.UNIT};
`;

const ShipImage = ({ ship }: { ship: IShip }) => (
  <img src={`${Environment.clientApiHostname}${ship.shipClass.image}`} alt={`${ship.name} (${ship.shipClass.name})`} />
);

export const ShipOverview = () => {
  const { ship, port } = useActiveShipContext();

  if (!ship) {
    return (
      <StyledOverview>
        <div>
          <h1>
            <TitleName>Contacting ship...</TitleName>
          </h1>
        </div>
      </StyledOverview>
    )
  }

  if (!port) {
    return (
      <StyledOverview>
        <div>
          <h1>
            <TitleName>{ship.name}</TitleName>
          </h1>
        </div>
        <TravellingShip>
          <ShipImage ship={ship} />
        </TravellingShip>
      </StyledOverview>
    );
  }

  return (
    <StyledOverview>
      <PlanetPosition>
        <Planet />
      </PlanetPosition>
      <div>
        <h1>
          <TitleName>{ship.name}</TitleName>
          <TitleConjunction> arrived at </TitleConjunction>
          <TitleLocation><PortName port={(ship.location as IPort)} /></TitleLocation>
        </h1>
      </div>
      <Ship>
        <ShipImage ship={ship} />
      </Ship>
    </StyledOverview>
  );
};
