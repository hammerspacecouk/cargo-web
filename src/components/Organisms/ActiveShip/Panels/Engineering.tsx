import * as React from "react";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import styled from "styled-components";
import { SIZES } from "@src/styles/typography";
import { GRID } from "@src/styles/variables";
import { ShieldStrength } from "@src/components/Molecules/ShieldStrength";
import { ActionButton, DangerButton } from "@src/components/Atoms/Button";
import { EditShipName } from "@src/components/Organisms/ActiveShip/EditShipName";
import { Modal } from "@src/components/Molecules/Modal";
import { ShipHealth } from "@src/components/Organisms/ActiveShip/ShipHealth";
import { useMounted } from "@src/hooks/useMounted";
import { PANEL_INNER_DIVIDER_BORDER } from "@src/styles/colours";
import { usePercent } from "@src/hooks/usePercent";
import { useNumber } from "@src/hooks/useNumber";
import { Icon, TEXT_ICON } from "@src/components/Atoms/Icon";
import { PlagueIcon } from "@src/components/Icons/PlagueIcon";
import { ScoreValue } from "@src/components/Molecules/ScoreValue";
import { TimeAgo } from "@src/components/Atoms/TimeAgo";
import { IActionToken } from "@src/interfaces";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { ApiClient } from "@src/utils/ApiClient";

const Panel = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h3`
  ${SIZES.E};
  text-transform: uppercase;
  margin-bottom: ${GRID.HALF};
  opacity: 0.7;
`;

const SectionDetail = styled.div`
  ${SIZES.D};
`;

const Name = styled.div`
  width: 100%;
  margin-bottom: ${GRID.UNIT};
  padding-bottom: ${GRID.UNIT};
  border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
  display: flex;
  align-items: center;
`;
const ShipClass = styled.div`
  width: 50%;
  padding-right: ${GRID.UNIT};
  border-right: ${PANEL_INNER_DIVIDER_BORDER};
`;
const Capacity = styled.div`
  width: 50%;
  padding-left: ${GRID.UNIT};
`;

const Shield = styled.div`
  width: 100%;
  margin-top: ${GRID.UNIT};
  padding-top: ${GRID.UNIT};
  border-top: ${PANEL_INNER_DIVIDER_BORDER};
`;

const SimplePanel = styled.div`
  width: 100%;
  margin-top: ${GRID.UNIT};
  padding-top: ${GRID.UNIT};
  border-top: ${PANEL_INNER_DIVIDER_BORDER};
`;

const shieldSize = "48px";
const ShieldIntro = styled.div`
  position: relative;
  padding-right: calc(${shieldSize} + ${GRID.UNIT});
  margin-bottom: ${GRID.UNIT};
`;
const StyledShield = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${shieldSize};
  height: ${shieldSize};
`;

const ShipName = styled.div`
  flex: 1;
  margin-right: ${GRID.UNIT};
`;

const SellRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: ${GRID.UNIT};
`;

const SellLabel = styled.div`
  flex: 1;
  margin-right: ${GRID.UNIT};
  ${SIZES.D};
`;

export const Engineering = () => {
  const [shipNameModalIsOpen, setShipNameModalIsOpen] = React.useState(false);
  const { buttonsDisabled, ship, requestNameToken, sellToken } = useActiveShipContext();
  const isMounted = useMounted();

  const { label, decimal } = usePercent(ship.strengthPercent);
  const strengthMax = useNumber(ship.shipClass.strength);
  const strengthValue = useNumber(Math.max(1, Math.ceil(decimal * ship.shipClass.strength)));

  return (
    <>
      <Panel>
        <Name>
          <ShipName>
            <SectionTitle>Name</SectionTitle>
            <SectionDetail>{ship.name}</SectionDetail>
          </ShipName>
          {requestNameToken && (
            <ActionButton disabled={buttonsDisabled} onClick={() => setShipNameModalIsOpen(true)}>
              Rename
            </ActionButton>
          )}
        </Name>

        <ShipClass>
          <SectionTitle>Class</SectionTitle>
          <SectionDetail>{ship.shipClass.name}</SectionDetail>
        </ShipClass>

        <Capacity>
          <SectionTitle>Capacity</SectionTitle>
          <SectionDetail>
            {ship.shipClass.capacity} crate{ship.shipClass.capacity !== 1 && "s"}
          </SectionDetail>
        </Capacity>

        <Shield>
          <ShieldIntro>
            <SectionTitle>Shield</SectionTitle>
            <SectionDetail>
              {strengthValue}/{strengthMax} ({label})
              <StyledShield>
                <ShieldStrength percent={ship.strengthPercent} />
              </StyledShield>
            </SectionDetail>
          </ShieldIntro>
          <ShipHealth />
        </Shield>

        <SimplePanel>
          <SectionTitle>Launched</SectionTitle>
          <SectionDetail>
            <TimeAgo datetime={new Date(ship.launchDate)} />
          </SectionDetail>
          {sellToken && (
            <SellRow>
              <SellLabel>
                <SectionTitle>Value</SectionTitle>
                <ScoreValue score={sellToken.cost} />
              </SellLabel>
              <TokenButton
                token={sellToken.actionToken}
                handler={async (token: IActionToken) => {
                  await ApiClient.tokenFetch(token);
                  window.location.href = "/play";
                }}
              >
                <DangerButton disabled={buttonsDisabled}>Sell</DangerButton>
              </TokenButton>
            </SellRow>
          )}
        </SimplePanel>

        {ship.hasPlague && (
          <SimplePanel>
            <SectionTitle>
              Infected{" "}
              <Icon size={TEXT_ICON}>
                <PlagueIcon />
              </Icon>
            </SectionTitle>
            <SectionDetail>
              <p>
                This ship is infected with the Stellar Plague. It can only travel at half of its normal speed and will
                slowly lose health.
              </p>
              <p>Bring this ship in the vicinity of a Medical Ship to cure it.</p>
            </SectionDetail>
          </SimplePanel>
        )}
      </Panel>
      {shipNameModalIsOpen && (
        <Modal isOpen={true} onClose={() => isMounted() && setShipNameModalIsOpen(false)} title="Request new ship name">
          <EditShipName onComplete={() => isMounted() && setShipNameModalIsOpen(false)} />
        </Modal>
      )}
    </>
  );
};
