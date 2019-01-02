import * as React from "react";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { useUpgradesContext } from "../../../context/Page/UpgradesContext";
import ShipUpgrade from "./ShipUpgrade";

export const ShipUpgrades = (): JSX.Element => {
  const { ships } = useUpgradesContext();
  if (ships === undefined) {
    return <Loading />; // todo - nice loading state
  }
  return (
    <ul>
      {ships.map((ship, index) => (
        <li key={index}>
          <ShipUpgrade ship={ship} />
        </li>
      ))}
    </ul>
  );
};
