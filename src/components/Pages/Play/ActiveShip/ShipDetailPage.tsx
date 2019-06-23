import * as React from "react";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ShipInPortPage } from "./ShipInPortPage";
import styled from "styled-components";
import { COLOURS, hexToRGBa } from "../../../../styles/colours";
import { ShipInChannelPage } from "./ShipInChannelPage";
import { IClassNameProps } from "../../../../interfaces";

export const ShipDetailPage = ({ className }: IClassNameProps) => {
  const { port } = useActiveShipContext();

  let innerPage;
  if (port) {
    innerPage = <ShipInPortPage />;
  } else {
    innerPage = <ShipInChannelPage />;
  }

  return <Page className={className}>{innerPage}</Page>;
};

const Page = styled.div`
  background-color: ${hexToRGBa(COLOURS.GREY.DARKEST, 0.75)};
  background-image: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 2px, 3px 100%;
`;
