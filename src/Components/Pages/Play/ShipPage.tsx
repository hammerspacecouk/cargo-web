import * as React from "react"
import Loading from "../../Navigation/Loading";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";


  export default () => {
    const {port, channel, ship} = useCurrentShipContext();
    if (!ship) {
      return <Loading />; // todo - error state, and ensure login?
    }

    let main = null;
    if (port) {
      main = <PortContainer />;
    } else if (channel) {
      main = <TravellingContainer />;
    }

    return (
      <main className="t-play__content-contain">
        <h1 style={{ display: "none" }}>{ship.name}</h1>
        {main}
      </main>
    );
  };
