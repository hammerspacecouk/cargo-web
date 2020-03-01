import * as React from "react";
import styled from "styled-components";
import { IActionToken, ILockedTransaction, IShipUpgrade } from "../../interfaces";
import { ListUnstyled } from "../Atoms/List/ListUnstyled";
import { GRID } from "../../styles/variables";
import { ShipUpgrade } from "../Molecules/ShipUpgrade";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { useState } from "react";
import { useButtonsDisabled } from "../../hooks/useButtonsDisabled";
import { useMounted } from "../../hooks/useMounted";
import { ApiClient } from "../../utils/ApiClient";
import { routes } from "../../routes";
import { Modal } from "../Molecules/Modal";
import { Prose } from "../Atoms/Prose";
import { ButtonRow } from "../Molecules/ButtonRow";
import Link from "next/link";
import { Button, ConfirmButton } from "../Atoms/Button";
import { ILaunchEvent, ILaunchShipsResponse } from "../../data/launch-ships";
import { IGameSessionResponse } from "../../data/game";
import { BREAKPOINTS } from "../../styles/media";

export const ShipUpgrades = ({ shipUpgrades, className }: IProps) => {
  const { setSession } = useGameSessionContext();
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

// todo - equalgrid component
const ListItem = styled.li`
  display: flex;
  padding: 0 0 ${GRID.UNIT} ${GRID.UNIT};
  width: 100%;
  ${BREAKPOINTS.S`width: 50%`};
  ${BREAKPOINTS.XXL`width: ${(100 / 3).toString(10)}%`};
  ${BREAKPOINTS.MAX`width: 25%`};
`;
