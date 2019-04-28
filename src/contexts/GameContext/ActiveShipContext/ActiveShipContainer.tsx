import * as React from "react";
import styled  from "styled-components";
import { scrollbars } from "../../../styles/colours";
import { ShipContextComponent } from "./ActiveShipContext";
import { ShipOverview } from "./Components/ShipOverview";
import { ShipDetailPage } from "./Page/ShipDetailPage";
import { useGameContext } from "../GameContext";

const StyledPlayBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledShipDetail = styled(ShipDetailPage)`
    flex: 1;
    overflow-y: auto;
    ${scrollbars}
`;

interface IProps {
  match: {
    params: {
      shipId: string;
    }
  }
}

export const ActiveShipContainer = (props: IProps) => {
  const {activeShip, setActiveShipById} = useGameContext();

  React.useEffect(() => {
    setActiveShipById(props.match.params.shipId);
    return () => {
      setActiveShipById(undefined);
    }
  }, [props.match.params.shipId]);

  return (
    <ShipContextComponent ship={activeShip && activeShip.ship}>
      <StyledPlayBoard>
        <ShipOverview/>
        <StyledShipDetail />
      </StyledPlayBoard>
    </ShipContextComponent>
  );
};
