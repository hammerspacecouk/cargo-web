import * as React from "react";
import styled from "styled-components";
import ShipInterface from "../../../interfaces/ShipInterface";
import HealthBar from "../../Molecules/HealthBar/HealthBar";
import { grid } from "../../../GlobalStyle";
import CreditsButton from "../../Atoms/CreditsButton/CreditsButton";
import TokenButton from "../../Button/TokenButton";
import { HealthIncreaseInterface } from "../../../interfaces/TransactionInterface";
import { ApiClient } from "../../../util/ApiClient";
import ActionTokenInterface from "../../../interfaces/ActionTokenInterface";
import { useAllowUpdate } from "../../../hooks/useAllowUpdate";
import { useSessionContext } from "../../../context/SessionContext";

interface PropsInterface {
  ship: ShipInterface;
  health: HealthIncreaseInterface[];
}

const Styled = styled.div`
    display: flex;
    align-items: center;
`;

const HealthBarContainer = styled.div`
    flex: 1;
`;

const Actions = styled.div`
`;

const Action = styled.div`
    display: inline-block;
    margin-left: ${grid.unit}px;
`;

export default function FleetShipHealth({ ship, health }: PropsInterface) {
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
    <Action key={transaction.actionToken.token}>
      <TokenButton token={transaction.actionToken} handler={applyHealth}>
        <CreditsButton
          amount={transaction.cost}
          disabledOverride={buttonsDisabled}
        >
          +{transaction.detail}%
        </CreditsButton>
      </TokenButton>
    </Action>
  ));

  return (
    <Styled>
      <HealthBarContainer>
        <HealthBar percent={ship.strengthPercent}/>
      </HealthBarContainer>
      <Actions>
        {actionButtons}
      </Actions>
    </Styled>
  );
}
