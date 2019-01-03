import * as React from "react";
import styled from "styled-components";
import {
  IFleetResponse,
  useFleetContext,
} from "../../../context/Page/FleetContext";
import { useSessionContext } from "../../../context/SessionContext";
import { IActionToken, IHealthIncrease, IScore } from "../../../Interfaces";
import { ApiClient } from "../../../util/ApiClient";
import { ButtonRow } from "../../Molecules/ButtonRow/ButtonRow";
import { CreditsButton } from "../../Molecules/CreditsButton/CreditsButton";
import { TokenButton } from "../../Molecules/TokenButton/TokenButton";

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
  const [buttonsDisabled, setButtonsDisabled] = React.useState(false);
  const { updateScore } = useSessionContext();
  const { setFleetData } = useFleetContext();
  const mounted = React.useRef(false);

  const applyHealth = async (token: IActionToken) => {
    if (!mounted.current) {
      return;
    }

    setButtonsDisabled(true);
    const data: IUpdateResponse = await ApiClient.tokenFetch(token);
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
