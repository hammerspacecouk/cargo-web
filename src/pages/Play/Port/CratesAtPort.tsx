import * as React from "react";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { CrateAtPort } from "./CrateAtPort";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import styled from "styled-components";
import { ListInline } from "../../../components/Atoms/Lists/ListInline/ListInline";
import { GRID } from "../../../styles/variables";
import { H2 } from "../../../components/Atoms/Heading/Heading";

const List = styled(ListInline)`
    margin-left: -${GRID.UNIT};
`;

const ListItem = styled.li`
    margin: 0 0 ${GRID.UNIT} ${GRID.UNIT};
`;

export default () => {
  const { cratesInPort } = useCurrentShipContext();

  if (cratesInPort === undefined) {
    return <Loading/>;
  } // todo - pretty loader

  return (
    <div className="t-port-crates">
      <H2>Crates at Port</H2>
      <List>
        {cratesInPort.map(crateAction => (
          <ListItem key={`cap-${crateAction.crate.id}`}>
            <CrateAtPort crateAction={crateAction}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
