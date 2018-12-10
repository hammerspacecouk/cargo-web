import ShipInterface from "../../../interfaces/ShipInterface";
import { Link } from "react-router-dom";
import * as React from "react";
import routes from "../../../routes";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import PlaceHolder from "../../Atoms/Placeholder/PlaceHolder";
import ShieldStrength from "../../Molecules/ShieldStrength/ShieldStrength";
import { H2, H6 } from "../../Atoms/Heading/Heading";

interface PropsInterface {
  ship?: ShipInterface;
}

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  margin: ${GRID.UNIT} 0;
`;

const Status = styled.div`
  width: 52px;
  margin-right: ${GRID.UNIT};
`;
const Detail = styled.div`
  flex: 1;
  line-height: 1;
`;

const StyledLink = styled(Link)`
  color: inherit;
`;
const Destroyed = styled.span`
  text-decoration: line-through;
`;

export default function FleetShipName({ ship }: PropsInterface) {
  let detail;
  if (ship) {
    if (ship.isDestroyed) {
      detail = (
        <Destroyed>
          <H2>{ship.name}</H2>
          <H6 as="div">{ship.shipClass.name}</H6>
        </Destroyed>
      );
    } else {
      detail = (
        <StyledLink to={routes.getPlayShip(ship.id)}>
          <H2>{ship.name}</H2>
          <H6 as="div">{ship.shipClass.name}</H6>
        </StyledLink>
      );
    }
  } else {
    detail = (
      <>
        <H2>
          <PlaceHolder style={{ maxWidth: "240px", height: "40px" }} />
        </H2>
        <H6 as="div">
          <PlaceHolder style={{ maxWidth: "80px", height: "16px" }} />
        </H6>
      </>
    );
  }

  let shield = null;
  if (!ship || ship.strengthPercent) {
    shield = (
      <ShieldStrength percent={ship ? ship.strengthPercent : undefined} />
    );
  }

  return (
    <StyledWrap>
      <Status>{shield}</Status>
      <Detail>{detail}</Detail>
    </StyledWrap>
  );
}
