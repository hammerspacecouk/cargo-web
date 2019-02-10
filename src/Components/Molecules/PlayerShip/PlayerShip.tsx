import * as React from "react";
import styled from "styled-components";
import { Score } from "../../../containers/Player/Score";
import { IOffenceOption, IShip } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";
import { ShieldStrength } from "../ShieldStrength/ShieldStrength";
import { OffenceActions } from "../../Organisms/OffenceActions/OffenceActions";

interface IProps {
  ship: IShip;
  offence: IOffenceOption;
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

const Offence = styled.div`
`;

export const PlayerShip = ({ ship, offence }: IProps) => (
  <ShipItem>
    <Status>
      <ShieldStrength percent={ship.strengthPercent} player={ship.owner} />
    </Status>
    <Detail>
      <h3>{ship.name}</h3>
      <Score score={ship.owner.score} />
    </Detail>
    <Offence>
      <OffenceActions actions={offence} />
    </Offence>
  </ShipItem>
);
