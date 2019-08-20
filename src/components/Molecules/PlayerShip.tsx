import * as React from "react";
import styled from "styled-components";
import { IEffectAction, IShip } from "../../interfaces";
import { GRID } from "../../styles/variables";
import { ShieldStrength } from "./ShieldStrength";
import { OffenceActions } from "../Organisms/OffenceActions";
import { Score } from "../Organisms/Score";

interface IProps {
  ship: IShip;
  offence?: IEffectAction[];
}

const ShipRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ShipDetail = styled.div`
  display: flex;
  margin-right: ${GRID.UNIT};
  align-items: center;
`;

const Status = styled.div`
  width: 52px;
  margin-right: ${GRID.UNIT};
`;

const Detail = styled.div`
  flex: 1;
  line-height: 1;
`;

export const PlayerShip = React.memo(({ ship, offence }: IProps) => (
  <ShipRow>
    <ShipDetail>
      <Status>
        <ShieldStrength percent={ship.strengthPercent} player={ship.owner} />
      </Status>
      <Detail>
        <h3>{ship.name}</h3>
        <Score score={ship.owner.score} />
      </Detail>
    </ShipDetail>
    <OffenceActions actions={offence} />
  </ShipRow>
));
