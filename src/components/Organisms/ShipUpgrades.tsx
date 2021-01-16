import * as React from "react";
import styled from "styled-components";
import { IActionToken, ILockedTransaction, IShipUpgrade } from "@src/interfaces";
import { ListUnstyled } from "@src/components/Atoms/List/ListUnstyled";
import { GRID } from "@src/styles/variables";
import { ShipUpgrade } from "@src/components/Molecules/ShipUpgrade";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { useState } from "react";
import { useButtonsDisabled } from "@src/hooks/useButtonsDisabled";
import { useMounted } from "@src/hooks/useMounted";
import { ApiClient } from "@src/utils/ApiClient";
import { routes } from "@src/routes";
import { Modal } from "@src/components/Molecules/Modal";
import { Prose } from "@src/components/Atoms/Prose";
import { ButtonRow } from "@src/components/Molecules/ButtonRow";
import Link from "next/link";
import { Button, ConfirmButton } from "@src/components/Atoms/Button";
import { ILaunchEvent, ILaunchShipsResponse } from "@src/data/launch-ships";
import { IGameSessionResponse } from "@src/data/game";
import { BREAKPOINTS } from "@src/styles/media";
import { LaunchTutorial } from "@src/components/Organisms/Tutorial/LaunchTutorial";

export const ShipUpgrades = ({ shipUpgrades, className }: IProps) => {
  const { setSession, tutorialStep } = useGameSessionContext();
  const [launchEvent, setLaunchEvent] = useState(null);
  const [ships, setShips] = useState(shipUpgrades);
  const { disableButtons, enableButtons, buttonsDisabled } = useButtonsDisabled();
  const isMounted = useMounted();

  const purchaseHandler = async (token: IActionToken) => {
    disableButtons();
    const res: IPurchaseResponse = await ApiClient.tokenFetch(token);
    setSession(res.session);
    if (isMounted()) {
      setShips(res.shipsAvailable.ships);
      setLaunchEvent(res.launch);
      enableButtons();
    }
  };

  let launchModal;
  if (launchEvent) {
    const link = routes.getPlayShip(launchEvent.newShip.id);
    const onClose = () => setLaunchEvent(null);
    launchModal = (
      <Modal isOpen={true} title="Ship Launched" onClose={onClose}>
        <Prose>
          <p>
            <em>{launchEvent.newShip.name}</em> was launched at <strong>{launchEvent.atPort.name}</strong>
          </p>
        </Prose>
        <ButtonRow>
          <Link as={link.as} href={link.href}>
            <ConfirmButton as="a" href={link.as}>
              Show me
            </ConfirmButton>
          </Link>{" "}
          <Button onClick={onClose}>Close</Button>
        </ButtonRow>
      </Modal>
    );
  }

  return (
    <>
      {tutorialStep === 4 && <StyledTutorial />}
      <StyledShipsList as="ol" className={className}>
        {ships.map((ship, index) => (
          <ListItem key={`ship-upgrades-${index}`}>
            <ShipUpgrade ship={ship} purchaseHandler={purchaseHandler} disabled={buttonsDisabled} />
          </ListItem>
        ))}
      </StyledShipsList>
      {launchModal}
    </>
  );
};

interface IProps {
  shipUpgrades: (IShipUpgrade | ILockedTransaction)[];
  className?: string;
}

interface IPurchaseResponse {
  launch: ILaunchEvent;
  session: IGameSessionResponse;
  shipsAvailable: ILaunchShipsResponse;
}

const StyledShipsList = styled(ListUnstyled)`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${GRID.UNIT};
`;

const StyledTutorial = styled(LaunchTutorial)`
  margin-bottom: ${GRID.UNIT};
`;

// todo - equalgrid component
const ListItem = styled.li`
  display: flex;
  padding: 0 0 ${GRID.UNIT} ${GRID.UNIT};
  width: 100%;
  ${BREAKPOINTS.S`width: 50%`};
  ${BREAKPOINTS.XXL`width: ${(100 / 3).toString(10)}%`};
  ${BREAKPOINTS.MAX`width: 25%`};
`;
