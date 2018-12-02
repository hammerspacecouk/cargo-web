import * as React from "react";
import styled from "styled-components";
import ShipInterface from "../../../interfaces/ShipInterface";
import HealthBar from "../../Molecules/HealthBar/HealthBar";
import CreditsButton from "../../Molecules/CreditsButton/CreditsButton";
import TokenButton from "../../Button/TokenButton";
import { HealthIncreaseInterface } from "../../../interfaces/TransactionInterface";
import { ApiClient } from "../../../util/ApiClient";
import ActionTokenInterface from "../../../interfaces/ActionTokenInterface";
import { useAllowUpdate } from "../../../hooks/useAllowUpdate";
import { useSessionContext } from "../../../context/SessionContext";
import ButtonRow from "../../Molecules/ButtonRow/ButtonRow";

interface PropsInterface {
  health: HealthIncreaseInterface[];
}

const StyledContent = styled.div`
    text-align: right;
`;

export default function FleetShipHealth({ health }: PropsInterface) {
  const [buttonsDisabled, setButtonsDisabled] = React.useState(false);
  const { updateScore } = useSessionContext();
  const allowUpdate = useAllowUpdate();

  const applyHealth = async (token: ActionTokenInterface) => {
    setButtonsDisabled(true);
    const data = await ApiClient.tokenFetch(token);
    if (allowUpdate) {
      updateScore(data.newScore);
      // todo - update health (And fleet?)
      setButtonsDisabled(false);
    }
  };

  let actionButtons = health.map(transaction => (
    <TokenButton key={transaction.actionToken.token} token={transaction.actionToken} handler={applyHealth}>
      <CreditsButton
        amount={transaction.cost}
        disabledOverride={buttonsDisabled}
      >
        <span>+{transaction.detail}%</span>
      </CreditsButton>
    </TokenButton>
  ));

  return (
    <StyledContent>
      <ButtonRow>
        {actionButtons}
      </ButtonRow>
    </StyledContent>
  );
}
