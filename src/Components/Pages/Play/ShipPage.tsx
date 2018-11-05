import * as React from "react";
import Loading from "../../Navigation/Loading";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import Port from "./Ship/Port";
import Travelling from "./Ship/Travelling";


export default () => {
  const { port, channel, ship } = useCurrentShipContext();
  if (!ship) {
    return <Loading/>; // todo - error state, and ensure login?
  }

  let main = null;
  if (port) {
    main = <Port />;
  } else if (channel) {
    main = <Travelling />;
  }

  return (
    <main className="t-play__content-contain">
      <h1 style={{ display: "none" }}>{ship.name}</h1>
      {main}
    </main>
  );
};
