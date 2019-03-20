import * as React from "react";
import styled from "styled-components";
import { Message } from "../../components/Molecules/Message/Message";
import {
  UpgradesContextProvider,
  useUpgradesContext,
} from "../../context/Page/UpgradesContext";
import { ShipUpgrades } from "./Upgrades/ShipUpgrades";
import { EffectUpgrades } from "./Upgrades/EffectUpgrades";
import { ContentPanel } from "../../components/Molecules/ContentPanel/ContentPanel";
import { Hidden } from "../../components/Atoms/Hidden/Hidden";
import { IEffectUpgrade } from "../../Interfaces";
import { MaxContentArea } from "../../components/Templates/MaxSection/MaxContentArea";
import { GRID } from "../../styles/variables";
import { Loading } from "../../components/Atoms/Loading/Loading";
import { BREAKPOINTS } from "../../styles/media";

const StyledContentPanel = styled(ContentPanel)`
  margin-top: ${GRID.UNIT};
`;

const InventoryGrid = styled.div`
  ${BREAKPOINTS.L`
      display: grid;
      column-gap: ${GRID.UNIT};
      grid-template-columns: [main] 1fr [aside] 40% [end]
    `};
`;

const InventoryEffects = styled.div`
  grid-column: main / aside;
`;
const InventoryShips = styled.div`
  grid-column: aside / end;
`;

const makePanel = (title: string, effects?: IEffectUpgrade[]) => {
  if (effects === undefined) {
    return (
      <StyledContentPanel panelTitle={title}>
        <Loading />
      </StyledContentPanel>
    );
  }

  if (!effects || effects.length === 0) {
    return null;
  }
  return (
    <StyledContentPanel panelTitle={title}>
      <EffectUpgrades effects={effects} />
    </StyledContentPanel>
  );
};

const UpgradesPageDetail = () => {
  const { message, effects } = useUpgradesContext();

  return (
    <MaxContentArea>
      <Hidden as="h1">Inventory</Hidden>
      {message && <Message message={message} />}
      <InventoryGrid>
        <InventoryEffects>
          {makePanel("Travel", effects && effects.travel)}
          {makePanel("Defence", effects && effects.defence)}
          {makePanel("Offence", effects && effects.offence)}
          {makePanel("Rare", effects && effects.special)}
        </InventoryEffects>
        <InventoryShips>
          <StyledContentPanel panelTitle="Ships">
            <ShipUpgrades />
          </StyledContentPanel>
        </InventoryShips>
      </InventoryGrid>
    </MaxContentArea>
  );
};

export const InventoryPage = () => (
  <UpgradesContextProvider>
    <UpgradesPageDetail />
  </UpgradesContextProvider>
);
