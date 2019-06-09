import * as React from "react";
import styled from "styled-components";
import { ShipNameGenerator } from "../../../../containers/Ship/ShipNameGenerator";
import { useMounted } from "../../../../hooks/useMounted";
import { IActionToken } from "../../../../Interfaces";
import { GRID } from "../../../../styles/variables";
import { ApiClient } from "../../../../util/ApiClient";
import { ConfirmButton, DangerButton } from "../../../../components/Atoms/Button/Button";
import { TextCursor } from "../../../../components/Atoms/TextCursor/TextCursor";
import { ButtonRow } from "../../../../components/Molecules/ButtonRow/ButtonRow";
import { CreditsButton } from "../../Components/CreditsButton";
import { TokenButton } from "../../../../components/Molecules/TokenButton/TokenButton";
import { useGameContext } from "../../GameContext";
import { useActiveShipContext } from "../ActiveShipContext";
import { ModalActions } from "../../../../components/Molecules/Modal/Modal";
import { SIZES } from "../../../../styles/typography";
import { BREAKPOINTS } from "../../../../styles/media";
import { P } from "../../../../components/Atoms/Text/Text";

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
  const { updateScore } = useGameContext();
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
    updateShipName(data.ship.name);
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
          <CreditsButton amount={500} />
        </TokenButton>
      );
    }
  }

  return (
    <Container>
      <Text>{textContent}</Text>
      <ModalActions>
        <ButtonRow>{buttonContent}</ButtonRow>
      </ModalActions>
    </Container>
  );
};
