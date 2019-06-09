import * as React from "react";
import styled from "styled-components";
import { IEffectAction, IShip } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";
import { ShieldStrength } from "../ShieldStrength/ShieldStrength";
import { OffenceActions } from "../../Organisms/OffenceActions/OffenceActions";
import { Score } from "../../Organisms/Score/Score";
import { ActionRow, ActionRowButton, ActionRowContent } from "../ActionRow/ActionRow";

interface IProps {
  ship: IShip;
  offence?: IEffectAction[];
}

const ShipDetail = styled(ActionRowContent)`
  display: flex;
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

export const PlayerShip = ({ ship, offence }: IProps) => (
  <ActionRow>
    <ShipDetail>
      <Status>
        <ShieldStrength percent={ship.strengthPercent} player={ship.owner} />
      </Status>
      <Detail>
        <h3>{ship.name}</h3>
        <Score score={ship.owner.score} />
      </Detail>
    </ShipDetail>
    <ActionRowButton>
      <OffenceActions actions={offence} ship={ship} />
    </ActionRowButton>
  </ActionRow>
);
