import * as React from "react";
import { WarningButton } from "@src/components/Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { IActionToken } from "@src/interfaces";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { IFleetResponse } from "@src/data/game";
import { ConvoyPane } from "./JoinConvoyPane";

export const LeaveConvoyPane = () => {
  const { updateFleet } = useGameSessionContext();
  const { portActionHandler, leaveConvoy, buttonsDisabled } = useActiveShipContext();

  const handler = async (token: IActionToken) => {
    const response: { fleet: IFleetResponse } = await portActionHandler(token);
    updateFleet(response.fleet.ships);
  };

  return (
    <ConvoyPane text="Convoys let you travel as one and combine your strength">
      <TokenButton token={leaveConvoy} handler={handler}>
        <WarningButton type="submit" disabled={buttonsDisabled}>
          Leave Convoy
        </WarningButton>
      </TokenButton>
    </ConvoyPane>
  );
};
