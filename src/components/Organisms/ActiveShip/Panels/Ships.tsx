import * as React from "react";
import styled from "styled-components";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { GRID } from "../../../../styles/variables";
import { PlayerShipList } from "../../PlayerShipList";
import { useTutorial } from "../../../../hooks/useTutorial";
import { ShipsTutorial } from "../../Tutorial/ShipsTutorial";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const OtherShips = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: -${GRID.UNIT};
  padding-right: ${GRID.UNIT};
  min-height: 64px;
  max-height: 320px;
`;

export const Ships = () => {
  const { shipsInLocation } = useActiveShipContext();
  const { showShipsIntro } = useTutorial();
  let tutorial;
  if (showShipsIntro) {
    tutorial = <ShipsTutorial/>;
  }

  return (
    <Panel>
      {tutorial}
      <OtherShips>
        <PlayerShipList ships={shipsInLocation} />
      </OtherShips>
    </Panel>
  );
};
