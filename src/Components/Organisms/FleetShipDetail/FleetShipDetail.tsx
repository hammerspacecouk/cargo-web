import * as React from "react";
import ShipInterface from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import { colours, grid } from "../../../GlobalStyle";
import FleetShipLocation from "../FleetShipLocation/FleetShipLocation";
import FleetShipHealth from "../FleetShipHealth/FleetShipHealth";
import EditShipName from "../EditShipName/EditShipName";
import { useAllowUpdate } from "../../../hooks/useAllowUpdate";
import { ApiClient } from "../../../util/ApiClient";
import TextCursor from "../../Atoms/TextCursor/TextCursor";

interface PropsInterface {
  ship: ShipInterface;
}

// todo - responsive margins
const StyledDetail = styled.div`
    margin: ${grid.unit}px 0 ${grid.unit * 4}px ${48 + grid.unit}px;
`;
const DetailRow = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: ${grid.unit}px;
    padding-bottom: ${grid.unit}px;
    border-bottom: solid 1px ${colours.gray[9]};
    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
`;
const DetailRowLabel = styled.div`
    width: 240px;
    font-size: 1.4rem;
    margin-right: ${grid.unit}px;  
`;
const DetailRowContent = styled.div`
    flex: 1;
`;

// todo - load the data here
export default function FleetShipDetail({ ship }: PropsInterface) {
  const [shipState, setShipState] = React.useState(ship);
  const [renameToken, setRenameToken] = React.useState(undefined);
  const [health, setHealth] = React.useState(undefined);
  const allowUpdate = useAllowUpdate();

  const getData = async () => {
    const data = await ApiClient.fetch(`/edit/${ship.id}`);
    if (allowUpdate) {
      setRenameToken(data.renameToken);
      setHealth(data.health);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);


  let healthDetail;
  if (health !== undefined) {
    healthDetail = (
      <FleetShipHealth ship={shipState} health={health}/>
    );
  } else {
    healthDetail = <TextCursor/>;
  }

  let nameDetail;
  if (renameToken !== undefined) {
    nameDetail = (
      <EditShipName
        ship={shipState}
        renameToken={renameToken}
        setRenameToken={setRenameToken}
      />
    );
  } else {
    nameDetail = <TextCursor/>;
  }

  return (
    <StyledDetail>
      <DetailRow>
        <DetailRowLabel>Location</DetailRowLabel>
        <DetailRowContent>
          <FleetShipLocation ship={shipState}/>
        </DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Health</DetailRowLabel>
        <DetailRowContent>
          {healthDetail}
        </DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Crates</DetailRowLabel>
        <DetailRowContent>Stuff</DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Ship name</DetailRowLabel>
        <DetailRowContent>
          {nameDetail}
        </DetailRowContent>
      </DetailRow>

    </StyledDetail>
  );
}
