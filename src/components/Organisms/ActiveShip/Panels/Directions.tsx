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
import { GRID, NAV_ITEM_HEIGHT, Z_INDEX } from "@src/styles/variables";
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
import { RiskyTravelTutorial } from "@src/components/Organisms/Tutorial/RiskyTravelTutorial";
import { NeedsConvoyTutorial } from "@src/components/Organisms/Tutorial/NeedsConvoyTutorial";
import { ReadyForConvoyTutorial } from "@src/components/Organisms/Tutorial/ReadyForConvoyTutorial";
import { MapIcon } from "@src/components/Icons/MapIcon";
import { ComplexButton } from "@src/components/Molecules/ComplexButton";
import { useEffect, useState } from "react";
import { ApiClient } from "@src/utils/ApiClient";
import { ChartBox } from "@src/components/Organisms/ChartBox";
import { CloseIcon } from "@src/components/Icons/CloseIcon";
import { BREAKPOINTS } from "@src/styles/media";

export const Directions = () => {
  const { directions } = useActiveShipContext();
  const { showNavigationIntro, showRiskyTravelIntro, showNeedsConvoy, showReadyForConvoy } = useTutorial();
  const [mapModalOpen, setMapModalOpen] = useState(false);
  let tutorial;
  if (showNavigationIntro) {
    tutorial = <TravelTutorial />;
  }
  if (showRiskyTravelIntro) {
    tutorial = <RiskyTravelTutorial />;
  }
  if (showNeedsConvoy) {
    tutorial = <NeedsConvoyTutorial />;
  }
  if (showReadyForConvoy) {
    tutorial = <ReadyForConvoyTutorial />;
  }

  if (!directions) {
    return <Loading />;
  }

  const { NW, NE, W, E, SW, SE } = directions;

  return (
    <>
      {tutorial}
      <ButtonBar>
        <ComplexButton icon={<MapIcon />} onClick={() => setMapModalOpen(true)}>
          Chart
        </ComplexButton>
      </ButtonBar>
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
      {mapModalOpen && <MapModal onClose={() => setMapModalOpen(false)} />}
    </>
  );
};

const MapModal = ({ onClose }: { onClose: () => void }) => {
  const [mapDetail, setMapDetail] = useState();
  useEffect(() => {
    (async () => {
      const response = await ApiClient.fetch("/play/map");
      if (response.map) {
        setMapDetail(response.map);
      }
    })();
  }, []);

  let inner = <Loading />;
  if (mapDetail) {
    inner = <ChartBox map={mapDetail} />;
  }

  return (
    <FullBox>
      {inner}
      <StyledCloseButton icon={<CloseIcon />} onClick={onClose} />
    </FullBox>
  );
};

const FullBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  z-index: ${Z_INDEX.MODAL_PANEL};
`;

const StyledCloseButton = styled(ComplexButton)`
  position: fixed;
  top: ${GRID.UNIT};
  right: ${GRID.UNIT};
  ${BREAKPOINTS.L`
    top: calc(${NAV_ITEM_HEIGHT});
  `}
`;

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

const ButtonBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${GRID.UNIT};
`;
