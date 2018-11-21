import * as React from "react";
import FleetShipInterface from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import { colours, grid } from "../../../GlobalStyle";
import ChevronDownIcon from "../../Icons/ChevronDownIcon/ChevronDownIcon";
import ItemButton from "../../Atoms/ItemButton/ItemButton";
import ChevronUpIcon from "../../Icons/ChevronUpIcon/ChevronUpIcon";
import FleetShipName from "../FleetShipName/FleetShipName";
import FleetShipDetail from "../FleetShipDetail/FleetShipDetail";

interface PropsInterface {
  ship?: FleetShipInterface;
}

const StyledItem = styled.li`
  border-bottom: dashed 1px ${colours.white};
  min-height: ${grid.unit * 6}px;
`;

const ShipIntro = styled.div`
  display: flex;
  align-items: start;
`;

const ButtonArea = styled.div`
  margin: ${grid.unit}px 0 ${grid.unit}px ${grid.unit}px;
  width: ${grid.unit * 4}px;
  height: ${grid.unit * 4}px;
`;

const ShipName = styled.div`
  flex: 1;
  padding: ${grid.unit} 0;
`;

export default function FleetShipItem({ship}: PropsInterface) {
  const [showDetail, setShowDetail] = React.useState(false);

  let moreButton = null;
  let detail = null;
  if (ship) {
    const icon = showDetail ? <ChevronUpIcon/> : <ChevronDownIcon />;
    moreButton = (
      <ButtonArea>
        <ItemButton onClick={() => setShowDetail((prev: boolean) => !prev)}>
          {icon}
        </ItemButton>
      </ButtonArea>
    );
    if (showDetail) {
      detail = <FleetShipDetail ship={ship}/>
    }
  }

  // todo - row needs to flag attention if:
  // todo - - health is low
  // todo - - sitting in an unsafe port
  return (
    <StyledItem >
      <ShipIntro>
        <ShipName>
          <FleetShipName ship={ship} />
        </ShipName>
        {moreButton}
      </ShipIntro>
      {detail}
    </StyledItem>
  );
}
