import * as React from "react";
import styled from "styled-components";
import { CreditsButton } from "./CreditsButton";
import { TokenButton } from "./TokenButton";
import { ILockedTransaction, IShipUpgrade } from "../../interfaces";
import { Environment } from "../../utils/environment";
import {
  LockedPurchaseCardDetail,
  PurchaseCard,
  PurchaseCardDescription,
  PurchaseCardDetail,
  PurchaseCardImage,
  PurchaseCardTitle
} from "./PurchaseCard";
import { P, TextWarning } from "../Atoms/Text";
import { GRID } from "../../styles/variables";
import { BREAKPOINTS } from "../../styles/media";
import { COLOURS } from "../../styles/colours";
import { ShipStats } from "./ShipStats";
import { Hidden } from "../Atoms/Hidden";
import { useLaunchShipsContext } from "../../contexts/LaunchShipsContext/LaunchShipsContext";

export const ShipUpgrade = ({ ship }: IProps) => {
  if (ship.available) {
    return <ShipPurchase ship={ship as IShipUpgrade}/>;
  }
  return <ShipLocked ship={ship as ILockedTransaction}/>;
};

interface IProps {
  ship?: IShipUpgrade | ILockedTransaction;
}

const ShipLocked = ({ ship }: { ship: ILockedTransaction }) => (
  <PurchaseCard>
    <LockedPurchaseCardDetail>
      <PurchaseCardTitle>
        <TextWarning>{ship.requirement}</TextWarning>
      </PurchaseCardTitle>
    </LockedPurchaseCardDetail>
    <PurchaseCardImage>
      <ShipImage>
        <Unknown>?</Unknown>
      </ShipImage>
    </PurchaseCardImage>
  </PurchaseCard>
);

const ShipPurchase = React.memo(({ ship }: { ship: IShipUpgrade }) => {
  const { buttonsDisabled, purchaseHandler } = useLaunchShipsContext();

  return (
    <PurchaseCard>
      <PurchaseCardDetail>
        <PurchaseCardTitle>{ship.detail.name}</PurchaseCardTitle>
        <PurchaseCardDescription>
          <Detail>
            <DetailDescription>{ship.detail.description}</DetailDescription>
            <DetailStats>
              <Hidden as="h3">Stats</Hidden>
              <ShipStats stats={ship.detail.stats}/>
            </DetailStats>
          </Detail>
        </PurchaseCardDescription>
        <StyledTokenButton token={ship.actionToken} handler={purchaseHandler}>
          <CreditsButton amount={ship.cost} disabledOverride={buttonsDisabled}/>
        </StyledTokenButton>
      </PurchaseCardDetail>
      <PurchaseCardImage notificationCount={ship.currentCount}>
        <ShipImage>
          <img src={`${Environment.clientApiHostname}${ship.detail.image}`} alt=""/>
        </ShipImage>
      </PurchaseCardImage>
    </PurchaseCard>
  );
});

const Detail = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const DetailDescription = styled(P)`
    flex: 1;
    margin-bottom: ${GRID.UNIT};
    ${BREAKPOINTS.M`margin-bottom: 0`};
`;
const DetailStats = styled.div`
    width: 100%;
    ${BREAKPOINTS.M`
      width: 304px;
      margin-left: ${GRID.UNIT};
      padding-left: ${GRID.UNIT};
      border-left: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
    `};
`;

const StyledTokenButton = styled(TokenButton)`
    display: flex;
    justify-content: center;
    ${BREAKPOINTS.M`justify-content: flex-end`};
`;

const ShipImage = styled.div`
  border-radius: 50%;
  background: ${COLOURS.GREY.DARKER};
  padding: ${GRID.UNIT};
  width: 112px;
  height: 112px;
  margin-top: 4px; // for the illusion of lining up a circle
`;

const Unknown = styled.div`
  font-size: 2rem;
  font-family: sans-serif;
  text-align: center;
  opacity: 0.4;
  line-height: 80px;
`;
