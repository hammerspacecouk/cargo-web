import * as React from "react";
import styled from "styled-components";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ListLined } from "../../../Atoms/List/ListLined";
import { TacticalEffect } from "../../../Molecules/TacticalEffect";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Tactical = () => {
  const { tacticalOptions, } = useActiveShipContext();
  if (!tacticalOptions) {
    return null;
  }

  return (
    <Panel>
      <ListLined>
        {tacticalOptions.map((option, i) => (
          <li key={option.effect ? option.effect.id : i}>
            <TacticalEffect option={option} />
          </li>
        ))}
      </ListLined>
    </Panel>
  );
};
