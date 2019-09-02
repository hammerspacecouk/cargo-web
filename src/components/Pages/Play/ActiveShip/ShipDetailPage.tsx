import * as React from "react";
import Head from "next/head";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ShipInPortPage } from "./ShipInPortPage";
import { ShipInChannelPage } from "./ShipInChannelPage";
import { MessageModal } from "../../../Organisms/ActiveShip/MessageModal";
import { pageTitle } from "../../../../utils/pageTitle";
import { Loading } from "../../../Atoms/Loading";
import { useGameSessionContext } from "../../../../contexts/GameSessionContext/GameSessionContext";
import { useEffect } from "react";

export const ShipDetailPage = () => {
  const { setActiveShipById } = useGameSessionContext();
  const { ship, port } = useActiveShipContext();

  useEffect(() => {
    const id = ship ? ship.id : null;
    setActiveShipById(id);
    return () => setActiveShipById(null);
  }, [ship]);

  let innerPage;
  if (port) {
    innerPage = <ShipInPortPage />;
  } else if (ship) {
    innerPage = <ShipInChannelPage />;
  } else {
    innerPage = <Loading />;
  }

  return (
    <>
      <Head>
        <title>{pageTitle(ship ? ship.name : "Loading...")}</title>
      </Head>
      {innerPage}
      <MessageModal />
    </>
  );
};
