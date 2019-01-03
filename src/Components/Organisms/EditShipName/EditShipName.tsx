import * as React from "react";
import styled from "styled-components";
import { ShipNameGenerator } from "../../../containers/Ship/ShipNameGenerator";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { useFleetContext } from "../../../context/Page/FleetContext";
import { useSessionContext } from "../../../context/SessionContext";
import { useMounted } from "../../../hooks/useMounted";
import { IActionToken, IShip, ITransaction } from "../../../Interfaces";
import { BREAKPOINTS } from "../../../styles/media";
import { GRID } from "../../../styles/variables";
import { ApiClient } from "../../../util/ApiClient";
import { ConfirmButton, DangerButton } from "../../Atoms/Button/Button";
import { TextCursor } from "../../Atoms/TextCursor/TextCursor";
import { ButtonRow } from "../../Molecules/ButtonRow/ButtonRow";
import { CreditsButton } from "../../Molecules/CreditsButton/CreditsButton";
import { TokenButton } from "../../Molecules/TokenButton/TokenButton";

interface IProps {
  ship: IShip;
  renameToken: ITransaction;
}

const Container = styled.div`
  ${BREAKPOINTS.XL`
      display: flex;
      align-items: start;
    `};
`;
const Text = styled.div`
  margin: 0 0 ${GRID.UNIT};
  ${BREAKPOINTS.XL`
    flex: 1;
    margin: 0 ${GRID.UNIT} 0 0;
  `};
`;
const Updating = styled.span`
  font-size: 2.35rem;
`; // todo - share this value?

export const EditShipName = ({ ship, renameToken }: IProps) => {
  const [requestNameToken, setRequestNameToken] = React.useState(renameToken);
  const { updateScore } = useSessionContext();
  const { setFleetData } = useFleetContext();
  const { ship: currentShip, updateCurrentShip } = useCurrentShipContext();
  const [isActive, setIsActive] = React.useState(false);
  const [acceptingShipName, setAcceptingShipName] = React.useState(false);
  const [offeredShipName, setOfferedShipName] = React.useState(null);
  const [offeredShipNameToken, setOfferedShipNameToken] = React.useState(null);
  const isMounted = useMounted();

  const requestShipName = async (token: IActionToken) => {
    setIsActive(true);

    // make the API call
    const data = await ApiClient.tokenFetch(token);
    updateScore(data.newScore);
    if (isMounted()) {
      // todo - new token needs to be set on the fleet, in case you closed the panel
      setRequestNameToken(data.newRequestShipNameToken);
      setOfferedShipName(data.nameOffered);
      setOfferedShipNameToken(data.action);
    }
  };

  const resetOffer = () => {
    setOfferedShipName(null);
    setOfferedShipNameToken(null);
    setIsActive(false);
  };

  const acceptShipName = async (token: IActionToken) => {
    setAcceptingShipName(true);
    resetOffer();
    const data = await ApiClient.tokenFetch(token);
    if (isMounted()) {
      setAcceptingShipName(false);
      setFleetData(data.fleet);
      if (currentShip && currentShip.id === data.ship.id) {
        updateCurrentShip(data.ship);
      }
    }
  };

  let textContent;
  let buttonContent;
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
          <TokenButton token={offeredShipNameToken} handler={acceptShipName}>
            <ConfirmButton type="submit">Accept</ConfirmButton>
          </TokenButton>
          <DangerButton
            as="a"
            href="."
            onClick={(e: Event) => {
              e.preventDefault();
              resetOffer();
            }}
          >
            Reject
          </DangerButton>
        </>
      );
    } else {
      buttonContent = null;
    }
  } else {
    if (acceptingShipName) {
      textContent = (
        <Updating>
          Updating
          <TextCursor />
        </Updating>
      );
    } else {
      textContent = (
        <p>
          You can request a new name option at random. <br />
          You don't have to take it, but no refunds
        </p>
      );
      buttonContent = (
        <TokenButton
          token={requestNameToken.actionToken}
          handler={requestShipName}
        >
          <CreditsButton amount={500} />
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
};
