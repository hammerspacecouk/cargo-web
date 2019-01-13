import * as React from "react";
import { H1, H2 } from "../../components/Atoms/Heading/Heading";
import { Message } from "../../components/Molecules/Message/Message";
import {
  UpgradesContextProvider,
  useUpgradesContext,
} from "../../context/Page/UpgradesContext";
import { ShipUpgrades } from "./Upgrades/ShipUpgrades";
import { EffectUpgrades } from "./Upgrades/EffectUpgrades";

const UpgradesPageDetail = () => {
  const { message, weapons, defence, navigation } = useUpgradesContext();

  return (
    <section>
      <H1>The Yard</H1>
      {message && <Message message={message} />}
      <H2>Offence</H2>
      <EffectUpgrades effects={weapons} />
      <H2>Defence</H2>
      <EffectUpgrades effects={defence} />
      <H2>Navigation</H2>
      <EffectUpgrades effects={navigation} />
      <H2>Ships</H2>
      <ShipUpgrades />
    </section>
  );
};

export const UpgradesPage = () => (
  <UpgradesContextProvider>
    <UpgradesPageDetail />
  </UpgradesContextProvider>
);
