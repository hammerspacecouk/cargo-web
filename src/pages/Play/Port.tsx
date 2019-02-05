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
import { Crates } from "./Port/Crates";
import { Directions } from "./Port/Directions";
import { Welcome } from "./Port/Welcome";
import { IActionToken, ITravelOption } from "../../Interfaces";
import { EffectActionButton } from "../../components/Molecules/EffectActionButton/EffectActionButton";
import { Button } from "../../components/Atoms/Button/Button";
import { ApiClient } from "../../util/ApiClient";

const PortTemplate = styled.div`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  padding: ${GRID.UNIT};
`;

const TravelEffect = (option: ITravelOption) => {
  const { updateFullResponse } = useCurrentShipContext();
  const applyAction = async (token: IActionToken) => {
    // disableButtons(); // todo - add to context
    const data = await ApiClient.tokenFetch(token);
    updateFullResponse(data);
    // enableButtons();
  };

  if (option.actionToken) {
    return (
      <EffectActionButton
        key={option.effect.name}
        effect={option.effect}
        token={option.actionToken}
        disabled={false}
        handler={applyAction}
      />
    );
  }

  return (
    <Button
      disabled
      key={option.effect.name}
    >
      {option.effect.name}
    </Button>
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
          {travelEffects.map(TravelEffect)}
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
        <EventsList events={events} />
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
