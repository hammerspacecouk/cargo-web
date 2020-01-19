import * as React from "react";
import { Loading } from "../../../Atoms/Loading";
import { DirectionE } from "../../../Icons/DirectionE";
import { DirectionNE } from "../../../Icons/DirectionNE";
import { DirectionNW } from "../../../Icons/DirectionNW";
import { DirectionSE } from "../../../Icons/DirectionSE";
import { DirectionSW } from "../../../Icons/DirectionSW";
import { DirectionW } from "../../../Icons/DirectionW";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { IDirection } from "../../../../interfaces";
import { P, TextF, TextOk, TextWarning } from "../../../Atoms/Text";
import { PortName } from "../../../Molecules/PortName";
import { ScoreValue } from "../../../Molecules/ScoreValue";
import styled from "styled-components";
import { GRID } from "../../../../styles/variables";
import { H4 } from "../../../Atoms/Heading";
import { Distance } from "../../../Atoms/Distance";
import { useTutorial } from "../../../../hooks/useTutorial";
import { TravelTutorial } from "../../Tutorial/TravelTutorial";
import { TimeAgo } from "../../../Atoms/TimeAgo";
import { GridWrapper } from "../../../Atoms/GridWrapper";
import { ActionPane, ActionPaneButton, ActionPaneDetail, ActionPaneLine } from "../../../Molecules/ActionPane";
import { ActionButton, ConfirmButton } from "../../../Atoms/Button";
import { IntervalFormat } from "../../../Atoms/IntervalFormat";
import { ACTIVE_VIEW } from "../../../../contexts/ActiveShipContext/useActiveShip";
import { Modal, ModalType } from "../../../Molecules/Modal";
import { ButtonRow } from "../../../Molecules/ButtonRow";
import { TokenButton } from "../../../Molecules/TokenButton";

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
            Last Visit
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
          <ActionButton type="submit" disabled={buttonIsDisabled} onClick={buttonHandler}>
            <IntervalFormat seconds={detail.journeyTimeSeconds} />
          </ActionButton>
        </ActionPaneButton>
      </ActionPane>
      {modal}
    </StyledDirection>
  );
};

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
