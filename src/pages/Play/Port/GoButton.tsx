import * as React from "react";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import DirectionInterface from "../../../interfaces/DirectionInterface";
import TokenButton from "../../../components/Molecules/TokenButton/TokenButton";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import IntervalFormat from "../../../components/Formatting/IntervalFormat";
import {Button, TYPE_CONFIRM } from "../../../components/Atoms/Button/Button";
import ComplexButton from "../../../components/Molecules/ComplexButton/ComplexButton";

interface PropsInterface {
  direction: DirectionInterface;
  journeyTime: number;
  children: JSX.Element;
}

export default ({ direction, journeyTime, children }: PropsInterface) => {
  const { cratesOnShip, cratesInPort, ship } = useCurrentShipContext();
  const { buttonsDisabled, moveShip, openModal } = usePlayPortContext();
  const buttonDisabled = direction.action === null || buttonsDisabled;

  if (cratesOnShip === undefined) {
    return null;
  }

  const time = <IntervalFormat seconds={journeyTime} />;

  let actionButton = (
    <ComplexButton type="submit" disabled={buttonDisabled} icon={children}>
      {time}
    </ComplexButton>
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
      <ComplexButton
        type="submit"
        disabled={buttonDisabled}
        icon={children}
        onClick={() => {
          openModal(
            <TokenButton token={direction.action} handler={moveShip}>
              <Button styleType={TYPE_CONFIRM} type="submit">
                Yes
              </Button>
            </TokenButton>
          );
        }}
      >
        {time}
      </ComplexButton>
    );
  }
  return actionButton;
};
