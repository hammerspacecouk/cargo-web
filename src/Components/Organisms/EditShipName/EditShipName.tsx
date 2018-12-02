import * as React from "react";
import ShipInterface from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import { grid } from "../../../GlobalStyle";
import CreditsButton from "../../Molecules/CreditsButton/CreditsButton";
import TokenButton from "../../Button/TokenButton";
import ActionTokenInterface from "../../../interfaces/ActionTokenInterface";
import { ApiClient } from "../../../util/ApiClient";
import { useSessionContext } from "../../../context/SessionContext";
import { useFleetContext } from "../../../context/Page/FleetContext";
import ShipNameGenerator from "../../Ship/ShipNameGenerator";
import { useAllowUpdate } from "../../../hooks/useAllowUpdate";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import TextCursor from "../../Atoms/TextCursor/TextCursor";
import TransactionInterface from "../../../interfaces/TransactionInterface";
import Button, { TYPE_CONFIRM, TYPE_DANGER } from "../../Atoms/Button/Button";
import ButtonRow from "../../Molecules/ButtonRow/ButtonRow";

interface PropsInterface {
  ship: ShipInterface;
  renameToken: TransactionInterface;
  setRenameToken: (newToken: any) => void;
}

const Container = styled.div`
    @media (min-width: 61em) {
      display: flex;
      align-items: start;
    }
`;
const Text = styled.div`
    margin: 0 0 ${grid.unit}px;
    @media (min-width: 61em) {
        flex: 1;
        margin: 0 ${grid.unit}px 0 0;
    }
`;
const Updating = styled.span`
    font-size: 2.35rem;
`; // todo - share this value?

export default function EditShipName({ ship, renameToken, setRenameToken }: PropsInterface) {
  const { updateScore } = useSessionContext();
  const { setFleetData } = useFleetContext();
  const { ship: currentShip, updateCurrentShip } = useCurrentShipContext();
  const [isActive, setIsActive] = React.useState(false);
  const [acceptingShipName, setAcceptingShipName] = React.useState(false);
  const [offeredShipName, setOfferedShipName] = React.useState(null);
  const [offeredShipNameToken, setOfferedShipNameToken] = React.useState(null);
  const allowUpdate = useAllowUpdate();

  const requestShipName = async (
    token: ActionTokenInterface
  ) => {
    setIsActive(true);

    //make the API call
    const data = await ApiClient.tokenFetch(token);
    setOfferedShipName(data.nameOffered);
    setOfferedShipNameToken(data.action);

    setRenameToken(data.newRequestShipNameToken);
    updateScore(data.newScore);
  };

  const resetOffer = () => {
    setOfferedShipName(null);
    setOfferedShipNameToken(null);
    setIsActive(false);
  };

  const acceptShipName = async (
    token: ActionTokenInterface
  ) => {
    setAcceptingShipName(true);
    resetOffer();
    const data = await ApiClient.tokenFetch(token);
    if (allowUpdate) {
      setAcceptingShipName(false);
      setFleetData(data.fleet);
      if (currentShip && currentShip.id === data.ship.id) {
        updateCurrentShip(data.ship);
      }
    }
  };

  let textContent, buttonContent;
  if (isActive) {
    textContent = (
      <ShipNameGenerator
        offeredShipName={offeredShipName}
        offeredShipNameToken={offeredShipNameToken}
      />
    );
    if (offeredShipNameToken) {
      buttonContent = (
        <>
          <Button as="a"
            href="."
            styleType={TYPE_DANGER}
            onClick={(e) => {
              e.preventDefault();
              resetOffer();
            }}
          >
            Reject
          </Button>
          <TokenButton
            token={offeredShipNameToken}
            handler={acceptShipName}
          >
            <Button styleType={TYPE_CONFIRM} type="submit">
              Accept
            </Button>
          </TokenButton>
        </>
      );
    } else {
      buttonContent = null;
    }
  } else {
    if (acceptingShipName) {
      textContent = (
        <Updating>
          Updating<TextCursor/>
        </Updating>
      )
    } else {
      textContent = (
        <p>
          You can request a new name option at random. <br/>
          You don't have to take it, but no refunds
        </p>
      );
      buttonContent = (
        <TokenButton token={renameToken.actionToken} handler={requestShipName}>
          <CreditsButton amount={500}/>
        </TokenButton>
      );
    }
  }

  return (
    <Container>
      <Text>{textContent}</Text>
      <ButtonRow>{buttonContent}</ButtonRow>
    </Container>
  );
}
