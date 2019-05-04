import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";
import styled from "styled-components";
import { SIZES } from "../../../../styles/typography";
import { GRID } from "../../../../styles/variables";
import { COLOURS } from "../../../../styles/colours";
import { ShieldStrength } from "../../../../components/Molecules/ShieldStrength/ShieldStrength";
import { Button } from "../../../../components/Atoms/Button/Button";

const DL = styled.dl`
    dt {
        ${SIZES.E};
        text-transform: uppercase;
        margin-bottom: ${GRID.HALF};
        opacity: 0.7;
    }
    dd {
        ${SIZES.C};
    }
    display: flex;
    flex-wrap: wrap;
`;

const Name = styled.div`
    width: 100%;
    margin-bottom: ${GRID.UNIT};
    padding-bottom: ${GRID.UNIT};
    border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
`;
const ShipClass = styled.div`
    width: 50%;
    padding-right: ${GRID.UNIT};
    border-right: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
`;
const Capacity = styled.div`
    width: 50%;
    padding-left: ${GRID.UNIT};
`;

const Shield = styled.div`
    width: 100%;
    margin-top: ${GRID.UNIT};
    padding-top: ${GRID.UNIT};
    border-top: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
`;

const shieldSize = '48px';
const ShieldIntro = styled.div`
    position: relative;
    padding-right: calc(${shieldSize} + ${GRID.UNIT});
    margin-bottom: ${GRID.UNIT};
`;
const StyledShield = styled.div`
    position: absolute;
    top: ${GRID.HALF};
    right: 0;
    width: ${shieldSize};
`;

const ShipName = styled.dd`
    display: flex;
`;
const ShipNameLabel = styled.span`
    flex: 1;
    margin-right: ${GRID.UNIT};
`;

const RenameButton = styled(Button)`
    ${SIZES.E};
`;

export const Engineering = () => {
  const { ship } = useActiveShipContext();

  const strengthValue = Math.ceil((ship.strengthPercent / 100) * ship.shipClass.strength);

  return (
    <DL>
      <Name>
        <dt>Name</dt>
        <ShipName>
          <ShipNameLabel>{ship.name}</ShipNameLabel>
          <RenameButton onClick={() => alert('pop modal')}>Rename</RenameButton>
        </ShipName>
      </Name>

      <ShipClass>
        <dt>Class</dt>
        <dd>{ship.shipClass.name}</dd>
      </ShipClass>

      <Capacity>
        <dt>Capacity</dt>
        <dd>{ship.shipClass.capacity} crate{(ship.shipClass.capacity > 1) && "s"}</dd>
      </Capacity>

      <Shield>
        <ShieldIntro>
        <dt>Shield</dt>
        <dd>
          {strengthValue.toLocaleString()}/{ship.shipClass.strength.toLocaleString()} ({ship.strengthPercent}%)
          <StyledShield><ShieldStrength percent={ship.strengthPercent} /></StyledShield>
        </dd>
        </ShieldIntro>
      </Shield>
    </DL>


  );
};
