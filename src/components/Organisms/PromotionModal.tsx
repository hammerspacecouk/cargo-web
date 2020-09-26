import * as React from "react";
import {Button} from "@src/components/Atoms/Button";
import { Loading } from "@src/components/Atoms/Loading";
import { TextCenter } from "@src/components/Atoms/Text";
import { Modal } from "@src/components/Molecules/Modal";
import { Promotion } from "./Promotion";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { CurrentMissions } from "@src/components/Molecules/CurrentMissions";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { H3 } from "@src/components/Atoms/Heading";
import { SliderGroup } from "@src/components/Molecules/SliderGroup";
import {Environment} from "@src/utils/environment";

export const PromotionModal = () => {
  const { rankStatus, currentMissions } = useGameSessionContext();
  const [acknowledging, setAcknowledging] = React.useState(false);

  if (!rankStatus || !rankStatus.acknowledgeToken) {
    return null;
  }

  let button;
  if (acknowledging) {
    button = (
      <Button type="submit" disabled={true}>
        <Loading />
      </Button>
    );
  } else {
    button = <Button type="submit">Ok</Button>;
  }

  return (
    <Modal isOpen={true} title="Promotion">
      <Promotion rankStatus={rankStatus} />
      {currentMissions.length > 0 && (
        <NewMission>
          <Heading>New Mission</Heading>
          <CurrentMissions />
        </NewMission>
      )}

      <form
        action={`${Environment.clientApiHostname}/profile/acknowledge-promotion`}
        method="POST"
        onSubmit={() => setAcknowledging(true)}
      >
        <input type="hidden" name="token" value={rankStatus.acknowledgeToken} />
        {rankStatus.market && rankStatus.availableCredits !== undefined && (
        <Sliders
          sliders={[
            {
              title: "History",
              current: rankStatus.market.history,
              description: "Show more previously visited planets on the map",
              name: "set_history",
            },
            {
              title: "Discovery",
              current: rankStatus.market.discovery,
              description: "Increase speed of ships to make it easier to find new planets",
              name: "set_discovery",
            },
            {
              title: "Economy",
              current: rankStatus.market.economy,
              description: "Reduce the cost of all purchases",
              name: "set_economy",
            },
            {
              title: "Military",
              current: rankStatus.market.military,
              description: "Increase power of your weapons. Reduce effectiveness of attacks on your ships",
              name: "set_military",
            },
          ]}
          maxTotal={rankStatus.availableCredits}
        />
      )}
      <TextCenter as="div">
        {button}
      </TextCenter>
      </form>
    </Modal>
  );
};

const NewMission = styled.div`
  padding: ${GRID.UNIT};
  border-top: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
`;
const Heading = styled(H3)`
  text-align: center;
  margin-bottom: ${GRID.UNIT};
`;
const Sliders = styled(SliderGroup)`
  max-width: 480px;
  margin-bottom: ${GRID.UNIT};
`;
