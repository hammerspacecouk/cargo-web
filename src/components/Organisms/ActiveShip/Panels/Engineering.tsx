import * as React from "react";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import styled from "styled-components";
import { SIZES } from "../../../../styles/typography";
import { GRID } from "../../../../styles/variables";
import { ShieldStrength } from "../../../Molecules/ShieldStrength";
import { ActionButton } from "../../../Atoms/Button";
import { EditShipName } from "../EditShipName";
import { Modal } from "../../../Molecules/Modal";
import { ShipHealth } from "../ShipHealth";
import { useMounted } from "../../../../hooks/useMounted";
import { PANEL_INNER_DIVIDER_BORDER } from "../../../../styles/colours";
import { usePercent } from "../../../../hooks/usePercent";
import { useNumber } from "../../../../hooks/useNumber";
import { Icon, TEXT_ICON } from "../../../Atoms/Icon";
import { PlagueIcon } from "../../../Icons/PlagueIcon";

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

const Plague = styled.div`
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

const RenameButton = styled(ActionButton)`
  ${SIZES.E};
`;

export const Engineering = () => {
  const [shipNameModalIsOpen, setShipNameModalIsOpen] = React.useState(false);
  const { buttonsDisabled, ship, requestNameToken } = useActiveShipContext();
  const isMounted = useMounted();

  const { label, decimal } = usePercent(ship.strengthPercent);
  const strengthMax = useNumber(ship.shipClass.strength);
  const strengthValue = useNumber(Math.ceil(decimal * ship.shipClass.strength));

  return (
    <>
      <Panel>
        <Name>
          <ShipName>
            <SectionTitle>Name</SectionTitle>
            <SectionDetail>{ship.name}</SectionDetail>
          </ShipName>
          {requestNameToken && (
            <RenameButton disabled={buttonsDisabled} onClick={() => setShipNameModalIsOpen(true)}>
              Rename
            </RenameButton>
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

        {ship.hasPlague && (
          <Plague>
            <SectionTitle>
              Infected{" "}
              <Icon size={TEXT_ICON}>
                <PlagueIcon />
              </Icon>
            </SectionTitle>
            <SectionDetail>
              <p>
                This ship is infected with the Space Plague. It can only travel at half of its normal speed and will
                slowly lose health.
              </p>
              <p>Bring this ship in the vicinity of a Medical Ship to cure it.</p>
            </SectionDetail>
          </Plague>
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
