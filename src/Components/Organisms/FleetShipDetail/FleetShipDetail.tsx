import * as React from "react";
import styled from "styled-components";
import { IActionToken, IDefenceOption, IFleetShip } from "../../../Interfaces";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { FlexInline } from "../../Atoms/Flex/Flex";
import { H3 } from "../../Atoms/Heading/Heading";
import { EditShipName } from "../EditShipName/EditShipName";
import { FleetShipHealth } from "../FleetShipHealth/FleetShipHealth";
import { FleetShipLocation } from "../FleetShipLocation/FleetShipLocation";
import { EffectActionButton } from "../../Molecules/EffectActionButton/EffectActionButton";
import { CountdownToTime } from "../../Molecules/CountdownToTime/CountdownToTime";
import { useFleetContext } from "../../../context/Page/FleetContext";
import { ApiClient } from "../../../util/ApiClient";
import { Effect } from "../../Molecules/Effect/Effect";
import { Badge } from "../../Atoms/Badge/Badge";
import { EffectsRow } from "../EffectsRow/EffectsRow";

interface IProps {
  fleetShip: IFleetShip;
}

// todo - responsive margins
const StyledDetail = styled.div`
  margin: ${GRID.UNIT} 0 ${GRID.DOUBLE} calc(48px + ${GRID.UNIT});
`;
const DetailRow = styled(FlexInline)`
  margin-bottom: ${GRID.UNIT};
  padding-bottom: ${GRID.UNIT};
  border-bottom: solid 1px ${COLOURS.BODY.FADED};
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;
const DetailRowLabel = styled(H3)`
  width: 240px;
  margin-right: ${GRID.UNIT};
`;
const DetailRowContent = styled.div`
  flex: 1;
`;

const ActiveEffect = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ActiveDetail = styled(Badge)`
  position: absolute;
  bottom: -${GRID.HALF};
  margin: 0 auto;
`;

const DefenceEffect = (option: IDefenceOption) => {
  const {
    setFleetData,
    buttonsDisabled,
    enableButtons,
    disableButtons,
  } = useFleetContext();

  const applyAction = async (token: IActionToken) => {
    disableButtons();
    const data = await ApiClient.tokenFetch(token);
    setFleetData(data);
    enableButtons();
  };

  if (option.actionToken) {
    return (
      <EffectActionButton
        key={option.effect.name}
        effect={option.effect}
        token={option.actionToken}
        disabled={buttonsDisabled}
        handler={applyAction}
      />
    );
  }

  let detail = null;
  if (option.hitsRemaining) {
    detail = <ActiveDetail subtle={true}>{option.hitsRemaining}</ActiveDetail>;
  } else if (option.expiry) {
    detail = (
      <ActiveDetail subtle={true}>
        <CountdownToTime dateTime={option.expiry} />
      </ActiveDetail>
    );
  }

  return (
    <ActiveEffect key={option.effect.name}>
      <Effect isActive={!!detail} disabled={!detail} effect={option.effect} />
      {detail}
    </ActiveEffect>
  );
};

export const FleetShipDetail = ({ fleetShip }: IProps) => (
  <StyledDetail>
    <DetailRow>
      <EffectsRow>{fleetShip.defenceOptions.map(DefenceEffect)}</EffectsRow>
    </DetailRow>
    <DetailRow>
      <DetailRowLabel>Location</DetailRowLabel>
      <DetailRowContent>
        <FleetShipLocation ship={fleetShip.ship} />
      </DetailRowContent>
    </DetailRow>
    <DetailRow>
      <DetailRowLabel>Shield strength</DetailRowLabel>
      <DetailRowContent>
        <FleetShipHealth health={fleetShip.health} />
      </DetailRowContent>
    </DetailRow>
    <DetailRow>
      <DetailRowLabel>Ship name</DetailRowLabel>
      <DetailRowContent>
        <EditShipName
          ship={fleetShip.ship}
          renameToken={fleetShip.renameToken}
        />
      </DetailRowContent>
    </DetailRow>
  </StyledDetail>
);
