import * as React from "react";
import Head from "next/head";
import styled from "styled-components";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ShipInPortPage } from "./ShipInPortPage";
import { panelBackground } from "../../../../styles/colours";
import { ShipInChannelPage } from "./ShipInChannelPage";
import { IClassNameProps } from "../../../../interfaces";
import { ShipOverview } from "../../../Organisms/ActiveShip/ShipOverview";
import { MessageModal } from "../../../Organisms/ActiveShip/MessageModal";
import { pageTitle } from "../../../../utils/pageTitle";

export const ShipDetailPage = ({ className }: IClassNameProps) => {
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
      <StyledPlayBoard>
        <ShipOverview />
        <Page className={className}>{innerPage}</Page>
      </StyledPlayBoard>
      <MessageModal />
    </>
  );
};

const Page = styled.div`
  flex: 1;
  overflow-y: auto;
  ${panelBackground}
`;

const StyledPlayBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
