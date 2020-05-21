import * as React from "react";
import styled from "styled-components";
import { IEffectAction, IShip } from "@src/interfaces";
import { shieldColour, ShieldStrength } from "./ShieldStrength";
import { Score } from "@src/components/Organisms/Score";
import { ActionPane, ActionPaneButton, ActionPaneDetail, ActionPaneLine } from "./ActionPane";
import { GRID } from "@src/styles/variables";
import { H3 } from "@src/components/Atoms/Heading";
import { Icon, TEXT_ICON } from "@src/components/Atoms/Icon";
import { PlagueIcon } from "@src/components/Icons/PlagueIcon";
import { SIZES } from "@src/styles/typography";
import { PANEL_INNER_DIVIDER_BORDER } from "@src/styles/colours";

export const PlayerShip = ({ ship, offence, inactiveReason, getActionButton }: IProps) => {
  const action = getActionButton(offence, inactiveReason);
  return (
    <ActionPane highlightColor={shieldColour(ship.strengthPercent)}>
      <ActionPaneDetail>
        <Status>
          <ShieldStrength percent={ship.strengthPercent} player={ship.owner} />
        </Status>
        <ActionPaneLine>
          <H3>
            {ship.name}
            {ship.hasPlague && (
              <Plague title="Infected">
                <Icon size={TEXT_ICON}>
                  <PlagueIcon />
                </Icon>
              </Plague>
            )}
          </H3>
        </ActionPaneLine>
        <ActionPaneLine>
          <ShipClassName>{ship.shipClass.name}</ShipClassName>
        </ActionPaneLine>
        <ActionPaneLine>
          <p>{ship.owner.displayName}</p>
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
  inactiveReason?: string;
  getActionButton: (offenses?: IEffectAction[], inactiveReason?: string) => React.ReactNode;
}

const Plague = styled.span`
  margin-left: ${GRID.HALF};
`;

const ShipClassName = styled.p`
  ${SIZES.F};
  margin: 0 ${GRID.HALF};
  border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
  padding-bottom: ${GRID.HALF};
`;

const Status = styled.div`
  width: 52px;
  margin: 0 auto ${GRID.HALF};
`;

const StyledScore = styled(Score)`
  justify-content: center;
`;
