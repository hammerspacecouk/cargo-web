import * as React from "react";
import styled from "styled-components";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { TacticalEffect } from "../../../Molecules/TacticalEffect";
import { ListUnstyled } from "../../../Atoms/List/ListUnstyled";
import { GRID } from "../../../../styles/variables";
import { COLOURS } from "../../../../styles/colours";
import { Button } from "../../../Atoms/Button";
import { H3 } from "../../../Atoms/Heading";
import { ComplexButton } from "../../../Molecules/ComplexButton";
import { ChevronRightIcon } from "../../../Icons/ChevronRightIcon";
import { ChevronLeftIcon } from "../../../Icons/ChevronLeftIcon";
import { IEffectPurchase } from "../../../../interfaces";
import { EffectPurchase } from "../../../Molecules/EffectPurchase";
import { GridWrapper } from "../../../Atoms/GridWrapper";
import { BREAKPOINTS } from "../../../../styles/media";

enum VIEWS {
  SHOP,
  INVENTORY,
}

export const Tactical = () => {
  const { effectsToPurchase, tacticalOptions, port } = useActiveShipContext();
  const [visibleList, setVisibleList] = React.useState(VIEWS.SHOP);
  if (!tacticalOptions) {
    return null;
  }

  return (
    <Panel>
      {visibleList === VIEWS.SHOP && (
        <>
          <Intro>
            <H3>{port.name} Trading Post</H3>
            <ComplexButton suffixed icon={<ChevronRightIcon />} onClick={() => setVisibleList(VIEWS.INVENTORY)}>
              Inventory
            </ComplexButton>
          </Intro>
          <GridWrapper as="ul">
            {effectsToPurchase.map((option, i) => (
              <Option key={option.available ? (option as IEffectPurchase).detail.id : i}>
                <EffectPurchase option={option} />
              </Option>
            ))}
          </GridWrapper>
        </>
      )}
      {visibleList === VIEWS.INVENTORY && (
        <>
          <Intro>
            <ComplexButton icon={<ChevronLeftIcon />} onClick={() => setVisibleList(VIEWS.SHOP)}>
              Trading Post
            </ComplexButton>
            <H3>Inventory</H3>
          </Intro>
          {tacticalOptions.length > 0 ? (
            <GridWrapper as="ul">
              {tacticalOptions.map((option, i) => (
                <Option key={option.effect ? option.effect.id : i}>
                  <TacticalEffect option={option} />
                </Option>
              ))}
            </GridWrapper>
          ) : (
            <p>You have no items</p>
          )}
        </>
      )}
    </Panel>
  );
};

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const Intro = styled.div`
  display: flex;
  align-items: center;
  margin: ${GRID.UNIT} 0;
  padding-bottom: ${GRID.UNIT};
  border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
  button:first-child {
    margin-right: ${GRID.UNIT};
  }
  button:last-child {
    margin-left: auto;
  }
`;

const Option = styled.li`
  width: 100%;
  ${BREAKPOINTS.XS`width: 50%;`}
`;
