import * as React from "react";
import styled from "styled-components";
import { CreditsButton } from "./CreditsButton";
import { TokenButton } from "./TokenButton";
import { ILockedTransaction, IShipUpgrade } from "../../Interfaces";
import { Environment } from "../../utils/environment";
import {
  PurchaseCard,
  PurchaseCardDescription,
  PurchaseCardDetail,
  PurchaseCardImage,
  PurchaseCardTitle,
} from "./PurchaseCard";
import { P, TextWarning } from "../Atoms/Text";
import { GRID } from "../../styles/variables";
import { BREAKPOINTS } from "../../styles/media";
import { COLOURS } from "../../styles/colours";

export const ShipUpgrade = ({ ship }: IProps) => {
  if (ship.available) {
    return <ShipPurchase ship={ship as IShipUpgrade} />;
  }
  return <ShipLocked ship={ship as ILockedTransaction} />;
};

interface IProps {
  ship?: IShipUpgrade|ILockedTransaction;
}

const ShipLocked = ({ship}: {ship: ILockedTransaction}) => (
  <PurchaseCard>
    <PurchaseCardDetail>
      <PurchaseCardTitle>
        <TextWarning>{ship.requirement}</TextWarning>
      </PurchaseCardTitle>
    </PurchaseCardDetail>
    <ShipImage>
      <Unknown>?</Unknown>
    </ShipImage>
  </PurchaseCard>
);

const ShipPurchase = ({ship} : {ship: IShipUpgrade}) => {
  const makePurchase = () => {
    alert("todo");
  };
  const buttonsDisabled = false; // todo

  return (
    <PurchaseCard>
      <PurchaseCardDetail>
        <PurchaseCardTitle>{ship.detail.name}</PurchaseCardTitle>
        <PurchaseCardDescription>
          <P>{ship.detail.description}</P>
          <ShipStats>
            <ShipStat label="Capacity" value={ship.detail.capacity.toString(10)}/>
            <ShipStat label="Strength" value={ship.detail.strength.toString(10)}/>
          </ShipStats>
        </PurchaseCardDescription>
        <TokenButton token={ship.actionToken} handler={makePurchase}>
          <CreditsButton amount={ship.cost} disabledOverride={buttonsDisabled}/>
        </TokenButton>
      </PurchaseCardDetail>
      <ShipImage>
        <PurchaseCardImage notificationCount={ship.currentCount}>
          <img src={`${Environment.clientApiHostname}${ship.detail.image}`} alt=""/>
        </PurchaseCardImage>
      </ShipImage>
    </PurchaseCard>
  );
};

const ShipImage = styled.div`
  width: 48px;
  border-radius: 50%;
  background: ${COLOURS.GREY.DARKER};
  padding: ${GRID.UNIT};
    margin-right: ${GRID.UNIT};
  ${BREAKPOINTS.S`
      width: 112px;
   `}
`;

const Unknown = styled.div`
  font-size: 2rem;
  font-family: sans-serif;
  text-align: center;
  opacity: 0.4;
`;

const ShipStats = styled.dl`
  ${BREAKPOINTS.S`
      display: flex;
      justify-content: space-between;
    `};
`;

interface IShipStatProps {
  label: string;
  value: string;
}

const ShipStatLabel = styled.dt`
  display: inline;
  &:after {
    content: ":";
  }
`;
const ShipStatValue = styled.dd`
  display: inline;
  margin-left: ${GRID.UNIT};
`;

const ShipStat = ({ label, value }: IShipStatProps) => (
  <div>
    <ShipStatLabel>{label}</ShipStatLabel>
    <ShipStatValue>{value}</ShipStatValue>
  </div>
);
