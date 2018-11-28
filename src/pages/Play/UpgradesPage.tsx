import * as React from "react";
import {
UpgradesContextProvider,
useUpgradesContext
} from "../../context/Page/UpgradesContext";
import GenericMessage from "../../components/Molecules/Messages/GenericMessage/GenericMessage";
import ShipUpgrades from "./Upgrades/ShipUpgrades";

const UpgradesPage = () => {
  const { message } = useUpgradesContext();

  return (
    <section className="t-play__content-contain">
      <h1>The Yard</h1>
      {message && <GenericMessage message={message} />}
      <h2>Ships</h2>
      <ShipUpgrades />
    </section>
  );
};

export default () => (
  <UpgradesContextProvider>
    <UpgradesPage />
  </UpgradesContextProvider>
);
