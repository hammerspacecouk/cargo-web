import * as React from "react";
import styled from "styled-components";
import { scrollbarStyles } from "../../../../styles/colours";
import { useActiveShipContext } from "../ActiveShipContext";
import { GRID } from "../../../../styles/variables";
import { PlayerShipList } from "../../../../components/Organisms/PlayerShipList/PlayerShipList";
import { H4 } from "../../../../components/Atoms/Heading/Heading";
import { TacticalButton } from "../../../../components/Atoms/Button/Button";
import { Modal } from "../../../../components/Molecules/Modal/Modal";
import { ListLined } from "../../../../components/Atoms/Lists/ListLined/ListLined";
import { UseEffectItem } from "../../../../components/Molecules/UseEffectItem/UseEffectItem";
import { ListUnstyled } from "../../../../components/Atoms/Lists/ListUnstyled/ListUnstyled";
import { ActiveEffect } from "../../../../components/Molecules/ActiveEffect/ActiveEffect";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActiveEffectsRow = styled.div`
  margin-bottom: ${GRID.UNIT};
`;

const OtherShips = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: -${GRID.UNIT};
  padding-right: ${GRID.UNIT};
  ${scrollbarStyles};
  min-height: 64px;
  max-height: 320px;
`;

const ActiveEffectList = styled(ListUnstyled)`
  display: flex;
  flex-wrap: wrap;
  > li {
    margin: ${GRID.HALF} ${GRID.HALF} 0 0;
  }
`;

const PanelTacticalButton = styled(TacticalButton)`
  position: absolute;
  top: ${GRID.UNIT};
  right: ${GRID.UNIT};
`;

export const Tactical = () => {
  const { buttonsDisabled, tacticalOptions, shipsInLocation } = useActiveShipContext();
  const [showModal, setShowModal] = React.useState(false);

  const activeEffects = React.useMemo(() => {
    if (tacticalOptions) {
      return tacticalOptions.filter(option => option && option.isActive);
    }
    return null;
  }, [tacticalOptions]);

  if (!tacticalOptions) {
    return null;
  }

  let modal = null;
  if (showModal) {
    modal = (
      <Modal isOpen={true} title={`Use Tactical Effect?`} onClose={() => setShowModal(false)}>
        <ListLined>
          {tacticalOptions.map((option, i) => (
            <li key={option ? option.effect.id : i}>
              <UseEffectItem option={option} doneHandler={() => setShowModal(false)} />
            </li>
          ))}
        </ListLined>
      </Modal>
    );
  }

  let none, activeEffectsList;
  if (activeEffects.length) {
    activeEffectsList = (
      <ActiveEffectList>
        {activeEffects.map(activeEffect => (
          <li key={`active-${activeEffect.effect.id}`}>
            <ActiveEffect effectOption={activeEffect} />
          </li>
        ))}
      </ActiveEffectList>
    );
  } else {
    none = " NONE";
  }

  return (
    <Panel>
      <PanelTacticalButton disabled={buttonsDisabled} onClick={() => setShowModal(true)} />
      {modal}
      <ActiveEffectsRow>
        <H4 as="h3">Active effects:{none}</H4>
        {activeEffectsList}
      </ActiveEffectsRow>
      <OtherShips>
        <PlayerShipList ships={shipsInLocation} />
      </OtherShips>
    </Panel>
  );
};
