import * as React from "react";
import styled from "styled-components";
import { ShipNameGenerator } from "@src/components/Organisms/ShipNameGenerator";
import { useMounted } from "@src/hooks/useMounted";
import { IActionToken } from "@src/interfaces";
import { GRID } from "@src/styles/variables";
import { ApiClient } from "@src/utils/ApiClient";
import { ConfirmButton, DangerButton } from "@src/components/Atoms/Button";
import { TextCursor } from "@src/components/Atoms/TextCursor";
import { ButtonRow } from "@src/components/Molecules/ButtonRow";
import { CreditsButton } from "@src/components/Molecules/CreditsButton";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { SIZES } from "@src/styles/typography";
import { BREAKPOINTS } from "@src/styles/media";
import { P } from "@src/components/Atoms/Text";

const Container = styled.div`
  width: calc(100vw - (4 * ${GRID.UNIT}));
  max-width: 512px;
`;

const Text = styled.div`
  margin: 0 0 ${GRID.UNIT};
  text-align: center;
`;

const Updating = styled.span`
  ${SIZES.D};
  ${BREAKPOINTS.S`
    ${SIZES.B.toString()}
  `}
`;

interface IProps {
  onComplete: () => void;
}

export const EditShipName = ({ onComplete }: IProps) => {
  const { requestNameToken, setRequestNameToken, updateShipName } = useActiveShipContext();
  const { updateScore } = useGameSessionContext();
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
    setRequestNameToken(data.newRequestShipNameToken);
    if (isMounted()) {
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
    updateShipName(data.ship.name, data.fleet.ships);
    if (isMounted()) {
      setAcceptingShipName(false);
    }
    onComplete();
  };

  let textContent;
  let buttonContent;
  if (isActive) {
    textContent = <ShipNameGenerator offeredShipName={offeredShipName} offeredShipNameToken={offeredShipNameToken} />;
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
      buttonContent = (
        <>
          <ConfirmButton disabled>Accept</ConfirmButton>
          <DangerButton disabled>Reject</DangerButton>
        </>
      );
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
      textContent = <P>You can request a new name option at random. You don't have to take it, but no refunds</P>;
      buttonContent = (
        <TokenButton token={requestNameToken.actionToken} handler={requestShipName}>
          <CreditsButton amount={requestNameToken.cost} />
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
