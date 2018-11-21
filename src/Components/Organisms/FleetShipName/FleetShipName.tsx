import FleetShipInterface from "../../../interfaces/ShipInterface";
import { Link } from "react-router-dom";
import * as React from "react";
import routes from "../../../routes";
import styled from "styled-components";
import { grid } from "../../../GlobalStyle";
import PlaceHolder from "../../Atoms/Placeholder/PlaceHolder";

interface PropsInterface {
  ship?: FleetShipInterface;
}

/*
 &__name {
    @extend .d;
  }
  &__class {
    @extend .f;
    text-transform: uppercase;
  }
 */

const StyledWrap = styled.div`
    display: flex;
    align-items: center;
    margin: ${grid.unit}px 0;
`;

const Status = styled.div`
    width: 48px;
    margin-right: ${grid.unit}px;
`;
const Detail = styled.div`
    flex: 1;
`;

const StyledLink = styled(Link)`
    color: inherit;
`;

const Title = styled.div`
    font-size: 2rem;
`;

const Subtitle = styled.div`
    margin-top: ${grid.unit / 4}px;
    text-transform: uppercase;
`;

export default function FleetShipName({ ship }: PropsInterface) {
  let detail;
  if (ship) {
    detail = (
      <StyledLink to={routes.getPlayShip(ship.id)}>
        <Title>{ship.name}</Title>
        <Subtitle>{ship.shipClass.name}</Subtitle>
      </StyledLink>
    );
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
      </Status>
      <Detail>
        {detail}
      </Detail>
    </StyledWrap>
  );
}
