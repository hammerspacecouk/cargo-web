import * as React from "react";
import styled from "styled-components";
import { EventsList } from "../../components/Organisms/EventsList/EventsList";
import { PlayerShipList } from "../../components/Organisms/PlayerShipList/PlayerShipList";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import {
  PlayPortContextProvider,
  usePlayPortContext,
} from "../../context/Page/PlayPortContext";
import { GRID, MAX_CONTENT_WIDTH } from "../../styles/variables";
import { CrateModal } from "./Port/CrateModal";
import { Crates } from "../../contexts/GameContext/ActiveShipContext/Panels/Crates";
import { Directions } from "../../contexts/GameContext/ActiveShipContext/Panels/Directions";
import { Welcome } from "./Port/Welcome";
import { IActionToken, ITravelOption } from "../../Interfaces";
import { EffectActionButton } from "../../components/Molecules/EffectActionButton/EffectActionButton";
import { ApiClient } from "../../util/ApiClient";
import { Effect } from "../../components/Molecules/Effect/Effect";
import { EffectsRow } from "../../components/Organisms/EffectsRow/EffectsRow";
import { ContentPanel } from "../../components/Molecules/ContentPanel/ContentPanel";

interface ITravelEffectProps {
  option: ITravelOption;
}

const PortTemplate = styled.div`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  padding: ${GRID.UNIT};
`;

const ActiveEffect = styled.div`
  width: 64px;
`;

const TravelEffect = ({ option }: ITravelEffectProps) => {
  const { updateFullResponse } = useCurrentShipContext();
  const {
    buttonsDisabled,
    enableButtons,
    disableButtons,
  } = usePlayPortContext();
  const applyAction = async (token: IActionToken) => {
    disableButtons();
    const data = await ApiClient.tokenFetch(token);
    updateFullResponse(data);
    enableButtons();
  };

  if (option.actionToken) {
    return (
      <EffectActionButton
        key={option.effect.name}
        effect={option.effect}
        token={option.actionToken}
        disabled={buttonsDisabled}
        handler={applyAction}
      />
    );
  }

  return (
    <ActiveEffect key={option.effect.name}>
      <Effect
        isActive={option.isActive}
        disabled={!option.isActive}
        effect={option.effect}
      />
    </ActiveEffect>
  );
};

const PortComponent = () => {
  const { shipsInLocation, events, travelEffects } = useCurrentShipContext();
  const { departing } = usePlayPortContext();

  let portContent;
  if (departing) {
    portContent = <div>Departing...</div>; // todo - nice departing animations
  } else {
    let travelEffectsSection = null;
    if (travelEffects !== undefined) {
      travelEffectsSection = (
        <div>
          <EffectsRow>
            {travelEffects.map(option => (
              <TravelEffect key={option.effect.name} option={option} />
            ))}
          </EffectsRow>
        </div>
      );
    }

    portContent = (
      <>
        <Welcome />
        <Crates />
        {travelEffectsSection}
        <Directions />

        <h2>Players</h2>
        <PlayerShipList ships={shipsInLocation} />

        <ContentPanel panelTitle="Visitor's Record">
          <EventsList events={events} />
        </ContentPanel>
        <CrateModal />
      </>
    );
  }

  return <PortTemplate>{portContent}</PortTemplate>;
};

export const Port = () => (
  <PlayPortContextProvider>
    <PortComponent />
  </PlayPortContextProvider>
);
