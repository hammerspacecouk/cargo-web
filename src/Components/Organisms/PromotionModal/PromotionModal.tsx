import * as React from "react";
import { ApiClient } from "../../../util/ApiClient";
import { Loading } from "../../Atoms/Loading/Loading";
import { Modal } from "../../Molecules/Modal/Modal";
import { TokenButton } from "../../Molecules/TokenButton/TokenButton";
import { ActionTokenInterface } from "../../../Interfaces";
import { Promotion } from "../Promotion/Promotion";
import { useSessionContext } from "../../../context/SessionContext";
import { Button } from "../../Atoms/Button/Button";
import { TextCenter } from "../../Atoms/Text/Text";

export const PromotionModal = () => {
  const { rankStatus, updateRankStatus } = useSessionContext();
  const [acknowledging, setAcknowledging] = React.useState(false);

  const acknowledgePromotion = async (token: ActionTokenInterface) => {
    setAcknowledging(true);

    //make the API call
    const data = await ApiClient.tokenFetch(token);
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
      <Button type="submit" disabled>
        <Loading />
      </Button>
    );
  } else {
    button = (
      <Button type="submit">
        Ok
      </Button>
    );
  }

  return (
    <Modal isOpen={true} title="Promotion">
      <Promotion rankStatus={rankStatus} />
      <TextCenter>
        <TokenButton
          token={rankStatus.acknowledgeToken}
          handler={acknowledgePromotion}
        >
          {button}
        </TokenButton>
      </TextCenter>
    </Modal>
  );
};
