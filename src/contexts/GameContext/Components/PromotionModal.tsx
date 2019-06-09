import * as React from "react";
import { IActionToken } from "../../../Interfaces";
import { ApiClient } from "../../../util/ApiClient";
import { Button } from "../../../components/Atoms/Button/Button";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { TextCenter } from "../../../components/Atoms/Text/Text";
import { Modal } from "../../../components/Molecules/Modal/Modal";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { Promotion } from "../../../components/Organisms/Promotion/Promotion";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { useGameContext } from "../GameContext";

export const PromotionModal = () => {
  const { rankStatus, updateRankStatus } = useGameContext();
  const { refreshState } = useCurrentShipContext();
  const [acknowledging, setAcknowledging] = React.useState(false);

  const acknowledgePromotion = async (token: IActionToken) => {
    setAcknowledging(true);

    // make the API call
    const data = await ApiClient.tokenFetch(token);
    // refresh the current ship state as you may now be able to do more things
    refreshState();
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
