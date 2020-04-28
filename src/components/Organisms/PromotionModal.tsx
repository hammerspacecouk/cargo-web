import * as React from "react";
import { IActionToken } from "../../interfaces";
import { ApiClient } from "../../utils/ApiClient";
import { Button } from "../Atoms/Button";
import { Loading } from "../Atoms/Loading";
import { TextCenter } from "../Atoms/Text";
import { Modal } from "../Molecules/Modal";
import { TokenButton } from "../Molecules/TokenButton";
import { Promotion } from "./Promotion";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { CurrentMissions } from "../Molecules/CurrentMissions";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { H3 } from "../Atoms/Heading";

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
