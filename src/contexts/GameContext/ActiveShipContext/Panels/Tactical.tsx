import * as React from "react";
import styled from "styled-components";
import { scrollbarStyles, } from "../../../../styles/colours";
import { useActiveShipContext } from "../ActiveShipContext";
import { DefenceEffect } from "../Components/DefenceEffect";
import { IDefenceOption } from "../../../../Interfaces";
import { GRID } from "../../../../styles/variables";
import { ListUnstyled } from "../../../../components/Atoms/Lists/ListUnstyled/ListUnstyled";
import { PlayerShipList } from "../../../../components/Organisms/PlayerShipList/PlayerShipList";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const DefenceListGrid = styled(ListUnstyled)`
  margin-bottom: ${GRID.UNIT};
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  & > li {
    width: 56px;
    margin-left: ${GRID.UNIT};
  }
`;

const DefenceItem = ({ effect }: { effect?: IDefenceOption }) => {
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
  padding-right: ${GRID.UNIT};
  ${scrollbarStyles};
  min-height: 64px;
  max-height: 320px;
`;

export const Tactical = () => {
  const { defenceOptions, shipsInLocation } = useActiveShipContext();

  return (
    <Panel>
      {defenceOptions && (
        <DefenceListGrid>
          {defenceOptions.map((effect, i) => (
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
