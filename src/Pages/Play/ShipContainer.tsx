import * as React from "react";
import { ShipParamsInterface } from "./index";
import { useShipInLocation } from "../../hooks/Ship";
import Loading from "../../components/Navigation/Loading";

export default function ShipContainer({match}: ShipParamsInterface) {

  const {port, channel, ship} = useShipInLocation(match);
  if (!ship) {
    return <Loading />; // todo - error state, and ensure login?
  }

  let main = null;
  // if (port) {
  //   main = <PortContainer />;
  // } else if (channel) {
  //   main = <TravellingContainer />;
  // }

  return (
    <main className="t-play__content-contain">
      <h1 style={{ display: "none" }}>{ship.name}</h1>
      {main}
    </main>
  );
}
