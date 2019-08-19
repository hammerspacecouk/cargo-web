import * as React from "react";
import styled from "styled-components";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { TacticalEffect } from "../../../Molecules/TacticalEffect";
import { hiddenCss } from "../../../Atoms/Hidden";
import { PANEL_INNER_DIVIDER_BORDER } from "../../../../styles/colours";
import { GRID } from "../../../../styles/variables";

export const Tactical = () => {
  const { tacticalOptions } = useActiveShipContext();
  if (!tacticalOptions) {
    return null;
  }

  return (
    <Panel>
      <TacticalTable>
        <thead>
          <tr>
            <th>Effect</th>
            <th>Purchase</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          {tacticalOptions.map((option, i) => (
            <TacticalEffect option={option} key={option.effect ? option.effect.id : i} />
          ))}
        </tbody>
      </TacticalTable>
    </Panel>
  );
};

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const TacticalTable = styled.table`
  > thead {
    ${hiddenCss};
  }
  > tbody {
    border-top: ${PANEL_INNER_DIVIDER_BORDER};
    > tr {
      border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
      > td {
        vertical-align: top;
        padding: ${GRID.HALF} ${GRID.UNIT} ${GRID.HALF} 0;
        &:last-child {
          padding-right: 0;
        }
      }
    }
  }
`;
