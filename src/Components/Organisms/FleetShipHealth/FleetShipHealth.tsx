import * as React from "react";
import styled from "styled-components";
import MedicIcon from "../../Icons/MedicIcon/MedicIcon";
import {FleetShipInterface} from "../../../interfaces/ShipInterface";
import HealthBar from "../../Molecules/HealthBar/HealthBar";
import { grid } from "../../../GlobalStyle";
import PurchaseItemButton from "../../Molecules/PurchaseItemButton/PurchaseItemButton";


interface PropsInterface {
  ship: FleetShipInterface;
}

const Styled = styled.div`
    display: flex;
    align-items: center;
`;

const HealthBarContainer = styled.div`
    flex: 1;
`;

const Actions = styled.div`
    margin-left: ${grid.unit * 2}px;
`;
const Action = styled.div`
    display: inline-block;
    width: 48px;
    height: 48px;
`;

export default function FleetShipHealth({ ship }: PropsInterface) {
  return (
    <Styled>
      <HealthBarContainer>
        <HealthBar percent={ship.ship.strengthPercent}/>
      </HealthBarContainer>
      <Actions>
        <Action>
          <PurchaseItemButton icon={<MedicIcon/>} cost={500} handler={() => alert("yay")}/>
        </Action>
        <Action>
          <PurchaseItemButton icon={<MedicIcon/>} cost={1500} handler={() => alert("super yay")}/>
        </Action>
      </Actions>
    </Styled>
  );
}
