import ShipInterface from "../../../interfaces/ShipInterface";
import { Link } from "react-router-dom";
import * as React from "react";
import routes from "../../../routes";
import styled from "styled-components";
import { grid } from "../../../GlobalStyle";
import PlaceHolder from "../../Atoms/Placeholder/PlaceHolder";
import ShieldStrength from "../../Molecules/ShieldStrength/ShieldStrength";

interface PropsInterface {
  ship?: ShipInterface;
}

const StyledWrap = styled.div`
    display: flex;
    align-items: center;
    margin: ${grid.unit}px 0;
`;

const Status = styled.div`
    width: 60px;
    margin-right: ${grid.unit}px;
`;
const Detail = styled.div`
    flex: 1;
`;

const StyledLink = styled(Link)`
    color: inherit;
`;
const Destroyed = styled.span`
    text-decoration: line-through;
`;

const Title = styled.div`
    font-size: 1.2rem;
    @media (min-width: 30em) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.div`
    margin-top: ${grid.unit / 4}px;
    text-transform: uppercase;
`;

export default function FleetShipName({ ship }: PropsInterface) {
  let detail;
  if (ship) {

    if (ship.isDestroyed) {
      detail = (
        <Destroyed>
          <Title>{ship.name}</Title>
          <Subtitle>{ship.shipClass.name}</Subtitle>
        </Destroyed>
      );
    } else {
      detail = (
        <StyledLink to={routes.getPlayShip(ship.id)}>
          <Title>{ship.name}</Title>
          <Subtitle>{ship.shipClass.name}</Subtitle>
        </StyledLink>
      );
    }
  } else {
    detail = (
      <>
        <Title>
          <PlaceHolder style={{ maxWidth: "240px", height: "40px" }}/>
        </Title>
        <Subtitle>
          <PlaceHolder style={{ maxWidth: "80px", height: "16px" }}/>
        </Subtitle>
      </>
    );
  }

  return (
    <StyledWrap>
      <Status>
        <ShieldStrength percent={ship ? ship.strengthPercent : undefined} />
      </Status>
      <Detail>
        {detail}
      </Detail>
    </StyledWrap>
  );
}
