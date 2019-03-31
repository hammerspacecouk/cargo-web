import * as React from "react";
import styled from "styled-components";
import {
  IFleetResponse,
  useFleetContext,
} from "../../../context/Page/FleetContext";
import { IActionToken, IHealthIncrease, IScore } from "../../../Interfaces";
import { ApiClient } from "../../../util/ApiClient";
import { ButtonRow } from "../../Molecules/ButtonRow/ButtonRow";
import { CreditsButton } from "../../Molecules/CreditsButton/CreditsButton";
import { TokenButton } from "../../Molecules/TokenButton/TokenButton";
import { useMounted } from "../../../hooks/useMounted";
import { useGameContext } from "../../../context/GameContext";

interface IProps {
  health: IHealthIncrease[];
}

interface IUpdateResponse {
  fleet: IFleetResponse;
  newScore: IScore;
}

const StyledContent = styled.div`
  text-align: right;
`;

export const FleetShipHealth = ({ health }: IProps) => {
  const { updateScore } = useGameContext();
  const {
    setFleetData,
    buttonsDisabled,
    enableButtons,
    disableButtons,
  } = useFleetContext();
  const mounted = useMounted();

  const applyHealth = async (token: IActionToken) => {
    if (!mounted()) {
      return;
    }

    disableButtons();
    const data: IUpdateResponse = await ApiClient.tokenFetch(token);
    if (mounted()) {
      updateScore(data.newScore);
      setFleetData(data.fleet);
      enableButtons();
    }
  };

  const actionButtons = health.map(transaction => {
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
};
