import * as React from "react";
import { H1, H2 } from "../../components/Atoms/Heading/Heading";
import { Message } from "../../components/Molecules/Message/Message";
import {
  UpgradesContextProvider,
  useUpgradesContext,
} from "../../context/Page/UpgradesContext";
import { ShipUpgrades } from "./Upgrades/ShipUpgrades";
import { EffectUpgrades } from "./Upgrades/EffectUpgrades";
import { useCurrentView } from "../../hooks/useCurrentView";

export const VIEW_NAME = "INVENTORY_PAGE";

const UpgradesPageDetail = () => {
  const { message, effects } = useUpgradesContext();
  useCurrentView(VIEW_NAME);

  return (
    <section>
      <H1>The Yard</H1>
      {message && <Message message={message} />}
      <H2>Effects</H2>
      <EffectUpgrades effects={effects} />
      <H2>Ships</H2>
      <ShipUpgrades />
    </section>
  );
};

export const InventoryPage = () => (
  <UpgradesContextProvider>
    <UpgradesPageDetail />
  </UpgradesContextProvider>
);
