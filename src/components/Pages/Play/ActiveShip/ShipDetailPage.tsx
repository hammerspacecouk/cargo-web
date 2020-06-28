import * as React from "react";
import Head from "next/head";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { ShipInPortPage } from "./ShipInPortPage";
import { ShipInChannelPage } from "./ShipInChannelPage";
import { MessageModal } from "@src/components/Organisms/ActiveShip/MessageModal";
import { pageTitle } from "@src/utils/pageTitle";
import { Loading } from "@src/components/Atoms/Loading";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { useEffect } from "react";
import { TrialWarningModal } from "@src/components/Organisms/TrialWarningModal";

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
      <TrialWarningModal />
    </>
  );
};
