import * as React from "react";
import { useUpgradesContext } from "../../../context/Page/UpgradesContext";
import Loading from "../../../components/Navigation/Loading";
import ShipUpgrade from "./ShipUpgrade";

export default (): JSX.Element => {
  const { ships } = useUpgradesContext();
  if (ships === undefined) {
    return <Loading />; // todo - nice loading state
  }
  return (
    <ul>
      {ships.map((ship, index) => (
        <li key={index}><ShipUpgrade ship={ship} /></li>
      ))}
    </ul>
  );
};
