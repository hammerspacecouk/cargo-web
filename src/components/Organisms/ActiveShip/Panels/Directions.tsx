import * as React from "react";
import { Loading } from "@src/components/Atoms/Loading";
import { DirectionE } from "@src/components/Icons/DirectionE";
import { DirectionNE } from "@src/components/Icons/DirectionNE";
import { DirectionNW } from "@src/components/Icons/DirectionNW";
import { DirectionSE } from "@src/components/Icons/DirectionSE";
import { DirectionSW } from "@src/components/Icons/DirectionSW";
import { DirectionW } from "@src/components/Icons/DirectionW";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { IDirection } from "@src/interfaces";
import { P, TextF, TextOk, TextWarning } from "@src/components/Atoms/Text";
import { PortName } from "@src/components/Molecules/PortName";
import { ScoreValue } from "@src/components/Molecules/ScoreValue";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { H4 } from "@src/components/Atoms/Heading";
import { Distance } from "@src/components/Atoms/Distance";
import { useTutorial } from "@src/hooks/useTutorial";
import { TravelTutorial } from "@src/components/Organisms/Tutorial/TravelTutorial";
import { TimeAgo } from "@src/components/Atoms/TimeAgo";
import { GridWrapper } from "@src/components/Atoms/GridWrapper";
import { ActionPane, ActionPaneButton, ActionPaneDetail, ActionPaneLine } from "@src/components/Molecules/ActionPane";
import { ActionButton, ConfirmButton } from "@src/components/Atoms/Button";
import { IntervalFormat } from "@src/components/Atoms/IntervalFormat";
import { ACTIVE_VIEW } from "@src/contexts/ActiveShipContext/useActiveShip";
import { Modal, ModalType } from "@src/components/Molecules/Modal";
import { ButtonRow } from "@src/components/Molecules/ButtonRow";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { Icon, TEXT_ICON } from "@src/components/Atoms/Icon";
import { ConvoyIcon } from "@src/components/Icons/ConvoyIcon";

export const Directions = () => {
  const { directions } = useActiveShipContext();
  const { showNavigationIntro } = useTutorial();
  let tutorial;
  if (showNavigationIntro) {
    tutorial = <TravelTutorial />;
  }

  if (!directions) {
    return <Loading />;
  }

  const { NW, NE, W, E, SW, SE } = directions;

  return (
    <>
      {tutorial}
      <GridWrapper as="ul">
        <Direction direction={NW}>
          <DirectionNW />
        </Direction>
        <Direction direction={NE}>
          <DirectionNE />
        </Direction>
        <Direction direction={W}>
          <DirectionW />
        </Direction>
        <Direction direction={E}>
          <DirectionE />
        </Direction>
        <Direction direction={SW}>
          <DirectionSW />
        </Direction>
        <Direction direction={SE}>
          <DirectionSE />
        </Direction>
      </GridWrapper>
    </>
  );
};

interface IDirectionProps {
  direction?: IDirection;
  children: any;
}

const Direction = ({ direction, children }: IDirectionProps) => {
  const { buttonsDisabled, cratesOnShip, cratesInPort, ship, departureHandler, setActiveView } = useActiveShipContext();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  if (!direction) {
    return (
      <StyledDirection>
        <ActionPane disabled>
          <ActionPaneDetail>
            <StyledArrow>{children}</StyledArrow>
          </ActionPaneDetail>
        </ActionPane>
      </StyledDirection>
    );
  }
  const detail = direction.detail;
  const buttonIsDisabled = direction.action === null || buttonsDisabled;

  if (cratesOnShip === undefined) {
    return null;
  }

  const goToCrates = () => {
    setActiveView(ACTIVE_VIEW.CARGO);
    setModalIsOpen(false);
  };

  const closeModal = () => setModalIsOpen(false);

  const buttonHandler = () => {
    if (cratesOnShip.length === 0 && ship.shipClass.capacity > 0 && cratesInPort.length > 0) {
      setModalIsOpen(true);
    } else if (direction.action) {
      setModalIsOpen(false);
      departureHandler(direction.action);
    }
  };

  let modal;
  if (modalIsOpen) {
    modal = (
      <Modal isOpen={true} title="Confirm?" onClose={closeModal} type={ModalType.WARNING}>
        <P>You have not picked up any crates. Are you sure you want to leave?</P>
        <ButtonRow>
          <TokenButton token={direction.action} handler={departureHandler}>
            <ActionButton disabled={buttonIsDisabled} type="submit">
              Yes
            </ActionButton>
          </TokenButton>
          <ConfirmButton onClick={goToCrates}>Crates</ConfirmButton>
          <ConfirmButton onClick={closeModal}>Cancel</ConfirmButton>
        </ButtonRow>
      </Modal>
    );
  }

  let subLine = <StyledScoreValue score={detail.earnings} prefix="+" />;
  let lastVisit;
  if (detail.denialReason) {
    subLine = (
      <TextF as="div">
        <TextWarning>{detail.denialReason}</TextWarning>
      </TextF>
    );
  } else if (detail.lastVisitTime) {
    lastVisit = (
      <ActionPaneLine>
        <TextF as="div">
          <TextOk>
            Last Arrival
            <br />
            <TimeAgo datetime={new Date(detail.lastVisitTime)} />
          </TextOk>
        </TextF>
      </ActionPaneLine>
    );
  }

  return (
    <StyledDirection>
      <ActionPane>
        <ActionPaneDetail>
          <StyledArrow onClick={buttonHandler}>{children}</StyledArrow>
          <ActionPaneLine>
            <H4 as="h3">
              <PortName port={detail.destination} isHome={detail.isHomePort} />
            </H4>
          </ActionPaneLine>
          <ActionPaneLine>{subLine}</ActionPaneLine>
          {lastVisit}
        </ActionPaneDetail>
        <Distance value={detail.distanceUnit} />
        <ActionPaneButton>
          <GoButton type="submit" disabled={buttonIsDisabled} onClick={buttonHandler}>
            {ship.convoyId && (
              <Icon size={TEXT_ICON}>
                <ConvoyIcon />
              </Icon>
            )}
            <IntervalFormat seconds={detail.journeyTimeSeconds} />
          </GoButton>
        </ActionPaneButton>
      </ActionPane>
      {modal}
    </StyledDirection>
  );
};

const GoButton = styled(ActionButton)`
  display: flex;
  align-items: center;
  > :first-child:not(:last-child) {
    margin-right: ${GRID.QUARTER};
  }
`;

const StyledArrow = styled.div`
  width: ${GRID.QUADRUPLE};
  margin: 0 auto;
`;

const StyledDirection = styled.li`
  width: 50%;
`;

const StyledScoreValue = styled(ScoreValue)`
  justify-content: center;
`;
