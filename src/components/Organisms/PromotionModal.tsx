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

// todo - fix the commented out bits
export const PromotionModal = () => {
  const { rankStatus, updateRankStatus } = useGameSessionContext();
  // const { refreshState } = useCurrentShipContext();
  const [acknowledging, setAcknowledging] = React.useState(false);

  const acknowledgePromotion = async (token: IActionToken) => {
    setAcknowledging(true);

    // make the API call
    const data = await ApiClient.tokenFetch(token);
    // refresh the current ship state as you may now be able to do more things
    // refreshState();
    setAcknowledging(false);
    // Updating rankStatus should remove the token and thus close the modal
    updateRankStatus(data.rankStatus);
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
      <TextCenter>
        <TokenButton token={rankStatus.acknowledgeToken} handler={acknowledgePromotion}>
          {button}
        </TokenButton>
      </TextCenter>
    </Modal>
  );
};
