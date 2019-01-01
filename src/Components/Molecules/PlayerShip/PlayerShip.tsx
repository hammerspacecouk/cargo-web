import * as React from "react";
import styled from "styled-components";
import ShieldStrength from "../ShieldStrength/ShieldStrength";
import Score from "../../../containers/Player/Score";
import { ShipInterface } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";

interface PropsInterface {
  ship: ShipInterface;
}

const ShipItem = styled.div`
  display: flex;
`;

const Status = styled.div`
  width: 52px;
  margin-right: ${GRID.UNIT};
`;

const Detail = styled.div`
  flex: 1;
  line-height: 1;
`;

export default function PlayerShip({ ship }: PropsInterface) {
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
