import * as React from "react";
import { Message } from "../../Panel/Messages";
import {
  UpgradesContextProvider,
  useUpgradesContext
} from "../../../context/Page/UpgradesContext";
import ShipUpgrades from "./Upgrades/ShipUpgrades";

const UpgradesPage = () => {
  const { message } = useUpgradesContext();

  const messageItem = message && <Message message={message} />;

  return (
    <main className="t-play__content-contain">
      <h1>The Yard</h1>
      {messageItem}
      <h2>Ships</h2>
      <ShipUpgrades />
    </main>
  );
};

export default () => (
  <UpgradesContextProvider>
    <UpgradesPage />
  </UpgradesContextProvider>
);
