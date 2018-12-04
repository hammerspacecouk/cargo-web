import ShieldStrength from "../ShieldStrength/ShieldStrength";
import PlayerFlag from "../PlayerFlag/PlayerFlag";
import Score from "../../../containers/Player/Score";
import * as React from "react";
import ShipInterface from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import { grid } from "../../../GlobalStyle";

interface PropsInterface {
  ship: ShipInterface;
}

const ShipItem = styled.div`
    display: flex;
`;

const Status = styled.div`
    width: 52px;
    margin-right: ${grid.unit}px;
`;

const Detail = styled.div`
    flex: 1;
    line-height: 1;
`;

export default function PlayerShip({ship}: PropsInterface) {
  return (
    <ShipItem>
      <Status>
        <ShieldStrength percent={ship.strengthPercent} player={ship.owner} />
      </Status>
      <Detail>
        <h3>{ship.name}</h3>
        <Score score={ship.owner.score} />
      </Detail>
    </ShipItem>
  );
}
