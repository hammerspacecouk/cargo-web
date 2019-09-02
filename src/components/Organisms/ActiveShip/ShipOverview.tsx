import * as React from "react";
import styled from "styled-components";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";
import { GRID } from "../../../styles/variables";
import { Environment } from "../../../utils/environment";
import { ELEMENTS, SIZES } from "../../../styles/typography";
import { IShip } from "../../../interfaces";

const shipSize = "128px";

const StyledOverview = styled.div`
  padding-right: calc(${shipSize} + ${GRID.UNIT});
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
    );
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

  return null;
};
