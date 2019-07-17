import * as React from "react";
import Head from "next/head";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ShipInPortPage } from "./ShipInPortPage";
import { ShipInChannelPage } from "./ShipInChannelPage";
import { ShipOverview } from "../../../Organisms/ActiveShip/ShipOverview";
import { MessageModal } from "../../../Organisms/ActiveShip/MessageModal";
import { pageTitle } from "../../../../utils/pageTitle";
import { PlayBoardLayout } from "../../../Templates/PlayBoardLayout";

export const ShipDetailPage = () => {
  const { ship, port } = useActiveShipContext();

  let innerPage;
  if (port) {
    innerPage = <ShipInPortPage />;
  } else {
    innerPage = <ShipInChannelPage />;
  }

  return (
    <>
      <Head>
        <title>{pageTitle(ship.name)}</title>
      </Head>
      <PlayBoardLayout overview={<ShipOverview />}>
        {innerPage}
      </PlayBoardLayout>
      <MessageModal />
    </>
  );
};
