import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";
import styled from "styled-components";
import { SIZES } from "../../../../styles/typography";
import { GRID} from "../../../../styles/variables";
import { ShieldStrength } from "../../../../components/Molecules/ShieldStrength/ShieldStrength";
import { ActionButton } from "../../../../components/Atoms/Button/Button";
import { EditShipName } from "../Components/EditShipName";
import { Modal } from "../../../../components/Molecules/Modal/Modal";
import { ShipHealth } from "../Components/ShipHealth";
import { useMounted } from "../../../../hooks/useMounted";
import { PANEL_INNER_DIVIDER_BORDER } from "../../../../styles/colours";

const DL = styled.dl`
  dt {
    ${SIZES.E};
    text-transform: uppercase;
    margin-bottom: ${GRID.HALF};
    opacity: 0.7;
  }
  dd {
    ${SIZES.D};
  }
  display: flex;
  flex-wrap: wrap;
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

  const strengthValue = Math.ceil(
    (ship.strengthPercent / 100) * ship.shipClass.strength
  );

  return (
    <>
      <DL>
        <Name>
          <ShipName>
            <dt>Name</dt>
            <dd>{ship.name}</dd>
          </ShipName>
          {requestNameToken && (
            <RenameButton
              disabled={buttonsDisabled}
              onClick={() => setShipNameModalIsOpen(true)}
            >
              Rename
            </RenameButton>
          )}
        </Name>

        <ShipClass>
          <dt>Class</dt>
          <dd>{ship.shipClass.name}</dd>
        </ShipClass>

        <Capacity>
          <dt>Capacity</dt>
          <dd>
            {ship.shipClass.capacity} crate{ship.shipClass.capacity > 1 && "s"}
          </dd>
        </Capacity>

        <Shield>
          <ShieldIntro>
            <dt>Shield</dt>
            <dd>
              {strengthValue.toLocaleString()}/
              {ship.shipClass.strength.toLocaleString()} ({ship.strengthPercent}
              %)
              <StyledShield>
                <ShieldStrength percent={ship.strengthPercent} />
              </StyledShield>
            </dd>
          </ShieldIntro>
          <ShipHealth />
        </Shield>
      </DL>
      {shipNameModalIsOpen && (
        <Modal
          isOpen={true}
          onClose={() => isMounted() && setShipNameModalIsOpen(false)}
          title="Request new ship name"
        >
          <EditShipName onComplete={() => isMounted() && setShipNameModalIsOpen(false)} />
        </Modal>
      )}
    </>
  );
};
