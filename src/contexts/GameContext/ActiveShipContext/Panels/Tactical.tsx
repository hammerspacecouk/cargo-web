import * as React from "react";
import styled from "styled-components";
import { scrollbarStyles } from "../../../../styles/colours";
import { useActiveShipContext } from "../ActiveShipContext";
import { DefenceEffect } from "../Components/DefenceEffect";
import { ITacticalOption } from "../../../../Interfaces";
import { GRID } from "../../../../styles/variables";
import { ListUnstyled } from "../../../../components/Atoms/Lists/ListUnstyled/ListUnstyled";
import { PlayerShipList } from "../../../../components/Organisms/PlayerShipList/PlayerShipList";
import { EFFECT_WIDTH } from "../../../../components/Molecules/Effect/Effect";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const DefenceListGrid = styled(ListUnstyled)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: -${GRID.UNIT};
  & > li {
    width: ${EFFECT_WIDTH};
    margin-left: ${GRID.UNIT};
    margin-bottom: ${GRID.UNIT};
  }
`;

const DefenceItem = ({ effect }: { effect?: ITacticalOption }) => {
  return (
    <li>
      <DefenceEffect option={effect} />
    </li>
  );
};

const OtherShips = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: -${GRID.UNIT};
  ${scrollbarStyles};
  min-height: 64px;
  max-height: 320px;
`;

export const Tactical = () => {
  const { tacticalOptions, shipsInLocation } = useActiveShipContext();

  return (
    <Panel>
      {tacticalOptions && (
        <DefenceListGrid>
          {tacticalOptions.map((effect, i) => (
            <DefenceItem key={i} effect={effect} />
          ))}
        </DefenceListGrid>
      )}
      <OtherShips>
        <PlayerShipList ships={shipsInLocation} />
      </OtherShips>
    </Panel>
  );
};
