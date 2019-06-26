import * as React from "react";
import styled from "styled-components";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ShipInPortPage } from "./ShipInPortPage";
import { COLOURS, hexToRGBa, scrollbarStyles } from "../../../../styles/colours";
import { ShipInChannelPage } from "./ShipInChannelPage";
import { IClassNameProps } from "../../../../interfaces";
import { ShipOverview } from "../../../Organisms/ActiveShip/ShipOverview";
import { MessageModal } from "../../../Organisms/ActiveShip/MessageModal";

export const ShipDetailPage = ({ className }: IClassNameProps) => {
  const { port } = useActiveShipContext();

  let innerPage;
  if (port) {
    innerPage = <ShipInPortPage />;
  } else {
    innerPage = <ShipInChannelPage />;
  }

  return (
    <>
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
  display: flex;
  overflow-y: auto;
  ${scrollbarStyles}
  background-color: ${hexToRGBa(COLOURS.GREY.DARKEST, 0.75)};
  background-image: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 2px, 3px 100%;
`;

const StyledPlayBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
