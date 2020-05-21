import * as React from "react";
import { IEffectAction, IOtherShip } from "@src/interfaces";
import { Loading } from "@src/components/Atoms/Loading";
import { PlayerShip } from "@src/components/Molecules/PlayerShip";
import styled from "styled-components";
import { GridWrapper } from "@src/components/Atoms/GridWrapper";
import { BREAKPOINTS } from "@src/styles/media";

interface IProps {
  ships: IOtherShip[];
  getActionButton: (offenses?: IEffectAction[]) => React.ReactNode;
}

export const PlayerShipList = ({ ships, getActionButton }: IProps) => {
  if (ships === undefined) {
    return <Loading />;
  }

  if (ships.length === 0) {
    return <p>Lonely here</p>;
  }

  return (
    <GridWrapper as="ul">
      {ships.map((shipItem) => (
        <StyledItem key={shipItem.ship.id}>
          <PlayerShip
            ship={shipItem.ship}
            offence={shipItem.offence}
            inactiveReason={shipItem.inactiveReason}
            getActionButton={getActionButton}
          />
        </StyledItem>
      ))}
    </GridWrapper>
  );
};

const StyledItem = styled.li`
  width: 100%;
  ${BREAKPOINTS.XS`width: 50%;`}
`;
