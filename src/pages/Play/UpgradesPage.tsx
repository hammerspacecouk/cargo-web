import * as React from "react";
import {
  UpgradesContextProvider,
  useUpgradesContext
} from "../../context/Page/UpgradesContext";
import { Message } from "../../components/Molecules/Message/Message";
import ShipUpgrades from "./Upgrades/ShipUpgrades";
import { H1, H2 } from "../../components/Atoms/Heading/Heading";

const UpgradesPage = () => {
  const { message } = useUpgradesContext();

  return (
    <section>
      <H1>The Yard</H1>
      {message && <Message message={message} />}
      <H2>Ships</H2>
      <ShipUpgrades />
    </section>
  );
};

export default () => (
  <UpgradesContextProvider>
    <UpgradesPage />
  </UpgradesContextProvider>
);
