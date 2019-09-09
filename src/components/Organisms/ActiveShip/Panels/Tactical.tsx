import * as React from "react";
import styled from "styled-components";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { TacticalEffect } from "../../../Molecules/TacticalEffect";
import { useTutorial } from "../../../../hooks/useTutorial";
import { TacticalTutorial } from "../../Tutorial/TacticalTutorial";
import { ListUnstyled } from "../../../Atoms/List/ListUnstyled";
import { GRID } from "../../../../styles/variables";
import { COLOURS } from "../../../../styles/colours";

export const Tactical = () => {
  const { tacticalOptions } = useActiveShipContext();
  const { showTacticalIntro } = useTutorial();
  if (!tacticalOptions) {
    return null;
  }
  let tutorial;
  if (showTacticalIntro) {
    tutorial = <TacticalTutorial />;
  }

  return (
    <Panel>
      {tutorial}
      <ListUnstyled>
        {tacticalOptions.map((option, i) => (
          <Option key={option.effect ? option.effect.id : i}>
            <TacticalEffect option={option} />
          </Option>
        ))}
      </ListUnstyled>
    </Panel>
  );
};

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const Option = styled.li`
  &:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
    padding-bottom: ${GRID.UNIT};
    border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
  }
`;
