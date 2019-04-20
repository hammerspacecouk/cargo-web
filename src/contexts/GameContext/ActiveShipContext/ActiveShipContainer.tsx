import * as React from "react";
import { Route, Switch } from "react-router-dom";
import styled, { css } from "styled-components";
import { scrollbars } from "../../../styles/colours";
import { NotFound } from "../../../components/Organisms/Error/NotFound";
import { ShipContextComponent } from "./ActiveShipContext";
import { ShipOverview } from "./Components/ShipOverview";
import { ShipNavigation } from "./Components/ShipNavigation";
import { ShipDirectionsPage } from "./Page/ShipDirectionsPage";
import { ShipDetailPage } from "./Page/ShipDetailPage";
import { routes } from "../../../routes";
import { useGameContext } from "../GameContext";

const StyledPlayBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledMain = styled.main`
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
        <ShipNavigation/>
        <StyledMain>
          <Switch>
            <Route path={routes.getPlayShipDirections()} component={ShipDirectionsPage}/>
            <Route path={routes.getPlayShip()} component={ShipDetailPage}/>
            <Route component={NotFound}/>
          </Switch>
        </StyledMain>
      </StyledPlayBoard>
    </ShipContextComponent>
  );
};
