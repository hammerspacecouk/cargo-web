import * as React from "react";
import { ApiClient } from "../../util/ApiClient";
import {Loading} from "../Atoms/Loading/Loading";
import Modal from "../Panel/Modal";
import TokenButton from "../Molecules/TokenButton/TokenButton";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import Promotion from "./Promotion";
import { useSessionContext } from "../../context/SessionContext";

export default () => {
  const { rankStatus, updateRankStatus } = useSessionContext();
  const [acknowledging, setAcknowleging] = React.useState(false);

  const acknowledgePromotion = async (token: ActionTokenInterface) => {
    setAcknowleging(true);

    //make the API call
    const data = await ApiClient.tokenFetch(token);
    setAcknowleging(false);
    // Updating rankStatus should remove the token and thus close the modal
    updateRankStatus(data.rankStatus);
  };

  if (!rankStatus || !rankStatus.acknowledgeToken) {
    return null;
  }

  let button;
  if (acknowledging) {
    button = (
      <button className="button" type="submit" disabled>
        <Loading />
      </button>
    );
  } else {
    button = (
      <button className="button" type="submit">
        Ok
      </button>
    );
  }

  return (
    <Modal isOpen={true} title="Promotion">
      <Promotion rankStatus={rankStatus} />
      <div className="text--center">
        <TokenButton
          token={rankStatus.acknowledgeToken}
          handler={acknowledgePromotion}
        >
          {button}
        </TokenButton>
      </div>
    </Modal>
  );
};
