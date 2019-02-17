import * as React from "react";
import { H1, H2 } from "../../components/Atoms/Heading/Heading";
import { Message } from "../../components/Molecules/Message/Message";
import {
  UpgradesContextProvider,
  useUpgradesContext
} from "../../context/Page/UpgradesContext";
import { ShipUpgrades } from "./Upgrades/ShipUpgrades";
import { EffectUpgrades } from "./Upgrades/EffectUpgrades";
import { useCurrentView } from "../../hooks/useCurrentView";
import styled from "styled-components";
import { GRID, MAX_CONTENT_WIDTH } from "../../styles/variables";
import { BREAKPOINTS } from "../../styles/media";
import { ContentPanel } from "../../components/Molecules/ContentPanel/ContentPanel";
import { Hidden } from "../../components/Atoms/Hidden/Hidden";
import { IEffectUpgrade } from "../../Interfaces";

export const VIEW_NAME = "INVENTORY_PAGE";

// todo - abstract this out
const Section = styled.section`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  ${BREAKPOINTS.M`
    padding: ${GRID.UNIT};
  `}
`;

const makePanel = (title: string, effects?: IEffectUpgrade[]) => {
  if (!effects || effects.length === 0) {
    return null;
  }
  return (
    <ContentPanel panelTitle={title}>
      <EffectUpgrades effects={effects}/>
    </ContentPanel>
  );
};

const UpgradesPageDetail = () => {
  const { message, effects } = useUpgradesContext();
  useCurrentView(VIEW_NAME);

  return (
    <Section>
      <Hidden as="h1">Inventory</Hidden>
      {message && <Message message={message}/>}
      {makePanel('Travel', effects && effects.travel)}
      {makePanel('Defence', effects && effects.defence)}
      {makePanel('Offence', effects && effects.offence)}
      {makePanel('Rare', effects && effects.special)}
      <ContentPanel panelTitle="Ships">
        <ShipUpgrades/>
      </ContentPanel>
    </Section>
  );
};

export const InventoryPage = () => (
  <UpgradesContextProvider>
    <UpgradesPageDetail/>
  </UpgradesContextProvider>
);
