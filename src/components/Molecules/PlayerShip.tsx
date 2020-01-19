import * as React from "react";
import styled from "styled-components";
import { IEffectAction, IShip } from "../../interfaces";
import { shieldColour, ShieldStrength } from "./ShieldStrength";
import { Score } from "../Organisms/Score";
import { ActionPane, ActionPaneButton, ActionPaneDetail, ActionPaneLine } from "./ActionPane";
import { GRID } from "../../styles/variables";
import { H3 } from "../Atoms/Heading";

export const PlayerShip = ({ ship, offence, getActionButton }: IProps) => {
  const action = getActionButton(offence);
  return (
    <ActionPane highlightColor={shieldColour(ship.strengthPercent)}>
      <ActionPaneDetail>
        <Status>
          <ShieldStrength percent={ship.strengthPercent} player={ship.owner} />
        </Status>
        <ActionPaneLine>
          <H3>{ship.name}</H3>
        </ActionPaneLine>
        <ActionPaneLine>
          <p>{ship.shipClass.name}</p>
        </ActionPaneLine>
        <ActionPaneLine>
          <StyledScore score={ship.owner.score} />
        </ActionPaneLine>
      </ActionPaneDetail>
      {action && <ActionPaneButton>{action}</ActionPaneButton>}
    </ActionPane>
  );
};

interface IProps {
  ship: IShip;
  offence?: IEffectAction[];
  getActionButton: (offenses?: IEffectAction[]) => React.ReactNode;
}

const Status = styled.div`
  width: 52px;
  margin: 0 auto ${GRID.HALF};
`;

const StyledScore = styled(Score)`
  justify-content: center;
`;
