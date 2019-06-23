import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { scrollbarStyles } from "../../styles/colours";
import { ShipContextComponent } from "./ActiveShipContext";
import { ShipOverview } from "../../components/Organisms/ActiveShip/ShipOverview";
import { ShipDetailPage } from "../../components/Pages/Play/ActiveShip/ShipDetailPage";
import { useGameSessionContext } from "../GameSessionContext/GameSessionContext";
import { MessageModal } from "../../components/Organisms/ActiveShip/MessageModal";

const StyledPlayBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledShipDetail = styled(ShipDetailPage)`
  flex: 1;
  display: flex;
  overflow-y: auto;
  ${scrollbarStyles}
`;

interface IProps {
  match: {
    params: {
      shipId: string;
    };
  };
}

export const ActiveShipContainer = (props: IProps) => {
  const { activeShip, setActiveShipById } = useGameSessionContext();

  useEffect(() => {
    setActiveShipById(props.match.params.shipId);
    return () => {
      setActiveShipById(undefined);
    };
  }, [props.match.params.shipId]);

  return (
    <ShipContextComponent ship={activeShip && activeShip.ship}>
      <StyledPlayBoard>
        <ShipOverview />
        <StyledShipDetail />
      </StyledPlayBoard>
      <MessageModal />
    </ShipContextComponent>
  );
};
