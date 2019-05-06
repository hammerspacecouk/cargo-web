import * as React from "react";
import styled from "styled-components";
import { PANEL_INNER_DIVIDER_BORDER, scrollbarStyles } from "../../../../styles/colours";
import { useActiveShipContext } from "../ActiveShipContext";
import { ListGrid } from "../../../../components/Atoms/Lists/ListGrid/ListGrid";
import { DefenceEffect } from "../Components/DefenceEffect";
import { IDefenceOption } from "../../../../Interfaces";

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    border-top: ${PANEL_INNER_DIVIDER_BORDER};
`;

const DefenceItem = (effect?: IDefenceOption) => {
  return (
    <li>
      <DefenceEffect option={effect}/>
    </li>
  );
};

const OtherShips = styled.div`
    flex: 1;
    overflow-y: auto;
    ${scrollbarStyles};
`;

export const Tactical = () => {
  const {defenceOptions} = useActiveShipContext();

  return (
    <Panel>
      {defenceOptions && <ListGrid>{defenceOptions.map(DefenceItem)}</ListGrid>}
      <OtherShips>So ronery</OtherShips>
    </Panel>
  );
};
