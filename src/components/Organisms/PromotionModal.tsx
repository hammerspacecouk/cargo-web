import * as React from "react";
import { IActionToken } from "@src/interfaces";
import { ApiClient } from "@src/utils/ApiClient";
import { Button } from "@src/components/Atoms/Button";
import { Loading } from "@src/components/Atoms/Loading";
import { TextCenter } from "@src/components/Atoms/Text";
import { Modal } from "@src/components/Molecules/Modal";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { Promotion } from "./Promotion";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { CurrentMissions } from "@src/components/Molecules/CurrentMissions";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { H3 } from "@src/components/Atoms/Heading";

export const PromotionModal = () => {
  const { rankStatus, currentMissions } = useGameSessionContext();
  const [acknowledging, setAcknowledging] = React.useState(false);

  const acknowledgePromotion = async (token: IActionToken) => {
    setAcknowledging(true);

    // make the API call
    await ApiClient.tokenFetch(token);
    window.location.reload();
  };

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
      <TextCenter as="div">
        <TokenButton token={rankStatus.acknowledgeToken} handler={acknowledgePromotion}>
          {button}
        </TokenButton>
      </TextCenter>
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
