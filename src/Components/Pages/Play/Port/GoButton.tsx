import * as React from "react";
import { usePlayPortContext } from "../../../../context/Page/PlayPortContext";
import DirectionInterface from "../../../../interfaces/DirectionInterface";
import TokenButton from "../../../Button/TokenButton";
import { useCurrentShipContext } from "../../../../context/CurrentShipContext";

interface PropsInterface {
  direction: DirectionInterface;
  children: JSX.Element;
}

export default ({ direction, children }: PropsInterface) => {
  const { cratesOnShip, cratesInPort, ship } = useCurrentShipContext();
  const { buttonsDisabled, moveShip, openModal } = usePlayPortContext();
  const icon = children;
  const buttonDisabled = direction.action === null || buttonsDisabled;

  let actionButton = (
    <button
      className="button button--icon"
      type="submit"
      disabled={buttonDisabled}
      title="Go"
    >
      {children}
    </button>
  );
  if (!buttonDisabled) {
    actionButton = (
      <TokenButton token={direction.action} handler={moveShip}>
        {actionButton}
      </TokenButton>
    );
  }

  // if the player tries to leave without picking up any crates, warn them
  if (
    cratesOnShip.length === 0 &&
    ship.shipClass.capacity > 0 &&
    cratesInPort.length > 0
  ) {
    actionButton = (
      <button
        className="button button--icon"
        type="submit"
        disabled={buttonDisabled}
        title="Go"
        onClick={() => {
          openModal(
            <TokenButton token={direction.action} handler={moveShip}>
              <button className="button button--confirm" type="submit">
                Yes
              </button>
            </TokenButton>
          );
        }}
      >
        {icon}
      </button>
    );
  }
  return actionButton;
};
