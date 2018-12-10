import * as React from "react";
import styled from "styled-components";
import CreditsButton from "../../Molecules/CreditsButton/CreditsButton";
import TokenButton from "../../Molecules/TokenButton/TokenButton";
import { HealthIncreaseInterface } from "../../../interfaces/TransactionInterface";
import { ApiClient } from "../../../util/ApiClient";
import ActionTokenInterface from "../../../interfaces/ActionTokenInterface";
import { useSessionContext } from "../../../context/SessionContext";
import ButtonRow from "../../Molecules/ButtonRow/ButtonRow";
import {
  FleetResponseInterface,
  useFleetContext
} from "../../../context/Page/FleetContext";
import ScoreInterface from "../../../interfaces/ScoreInterface";

interface PropsInterface {
  health: HealthIncreaseInterface[];
}

interface UpdateResponseInterface {
  fleet: FleetResponseInterface;
  newScore: ScoreInterface;
}

const StyledContent = styled.div`
  text-align: right;
`;

export default function FleetShipHealth({ health }: PropsInterface) {
  const [buttonsDisabled, setButtonsDisabled] = React.useState(false);
  const { updateScore } = useSessionContext();
  const { setFleetData } = useFleetContext();
  const mounted = React.useRef(false);

  const applyHealth = async (token: ActionTokenInterface) => {
    if (!mounted.current) {
      return;
    }

    setButtonsDisabled(true);
    const data: UpdateResponseInterface = await ApiClient.tokenFetch(token);
    if (mounted.current) {
      updateScore(data.newScore);
      setFleetData(data.fleet);
      setButtonsDisabled(false);
    }
  };

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  let actionButtons = health.map(transaction => {
    return (
      <TokenButton
        key={transaction.actionToken.token}
        token={transaction.actionToken}
        handler={applyHealth}
      >
        <CreditsButton
          amount={transaction.cost}
          disabledOverride={buttonsDisabled}
        >
          <span>+{transaction.detail}%</span>
        </CreditsButton>
      </TokenButton>
    );
  });

  return (
    <StyledContent>
      <ButtonRow>{actionButtons}</ButtonRow>
    </StyledContent>
  );
}
