import * as React from "react";
import { ConfirmButton } from "../../../components/Atoms/Button/Button";
import { IntervalFormat } from "../../../components/Atoms/IntervalFormat/IntervalFormat";
import { ComplexButton } from "../../../components/Molecules/ComplexButton/ComplexButton";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { IDirection } from "../../../Interfaces";

interface IProps {
  direction: IDirection;
  journeyTime: number;
  children: JSX.Element;
}

export const GoButton = ({
  direction,
  journeyTime,
  children,
}: IProps) => {
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
              <ConfirmButton type="submit">Yes</ConfirmButton>
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
