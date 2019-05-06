import * as React from "react";
import { ConfirmButton } from "../../../../components/Atoms/Button/Button";
import { IntervalFormat } from "../../../../components/Atoms/IntervalFormat/IntervalFormat";
import { StackedButton } from "../../../../components/Molecules/StackedButton/StackedButton";
import { TokenButton } from "../../../../components/Molecules/TokenButton/TokenButton";
import { usePlayPortContext } from "../../../../context/Page/PlayPortContext";
import { IDirection } from "../../../../Interfaces";
import { useActiveShipContext } from "../ActiveShipContext";

interface IProps {
  direction: IDirection;
  journeyTime: number;
  children: JSX.Element;
}

export const GoButton = ({ direction, journeyTime, children }: IProps) => {
  const {
    buttonsDisabled,
    cratesOnShip,
    cratesInPort,
    ship,
  } = useActiveShipContext();
  const { moveShip, openModal } = usePlayPortContext(); // todo - ?
  const buttonDisabled = direction.action === null || buttonsDisabled;

  if (cratesOnShip === undefined) {
    return null;
  }

  const time = <IntervalFormat seconds={journeyTime} />;

  let actionButton = (
    <StackedButton type="submit" disabled={buttonDisabled} icon={children}>
      {time}
    </StackedButton>
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
      <StackedButton
        type="submit"
        disabled={buttonDisabled}
        icon={children}
        onClick={() => {
          openModal(
            <TokenButton token={direction.action} handler={moveShip}>
              <ConfirmButton type="submit">Yes</ConfirmButton>
            </TokenButton>
          );
        }}
      >
        {time}
      </StackedButton>
    );
  }
  return actionButton;
};
