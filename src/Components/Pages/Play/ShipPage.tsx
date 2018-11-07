import * as React from "react";
import { withRouter } from "react-router";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import Loading from "../../Navigation/Loading";
import Port from "./Port";
import Travelling from "./Travelling";
import NotFound from "../../Error/NotFound";
import { useEffect } from "react";
import { useRef } from "react";
import { ApiClient } from "../../../util/ApiClient";

export interface ShipParamsInterface {
  match: {
    params: {
      shipId: string;
    };
  };
}

export default withRouter(({match}: ShipParamsInterface) => {
  const { port, channel, ship, updateFullResponse } = useCurrentShipContext();

  const allowUpdate = useRef(true);
  useEffect(async () => {
    const response = await ApiClient.fetch(`/play/${match.params.shipId}`);
    const data = await response.json();
    if (allowUpdate.current) {
      updateFullResponse(data);
    }
    return () => {
      allowUpdate.current = false;
    };
  }, [match.params.shipId]);

  if (ship === undefined) {
    return <Loading />; // todo - error state, and ensure login?
  }
  if (!ship) {
    return <NotFound message="You be making ship up" />;
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
});
