import * as React from "react";
import styled from "styled-components";
import { CreditsButton } from "./CreditsButton";
import { TokenButton } from "./TokenButton";
import { IActionToken, IChildrenProps, ILockedTransaction, IShipUpgrade } from "../../interfaces";
import { P, TextWarning } from "../Atoms/Text";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { ShipStats } from "./ShipStats";
import { Hidden } from "../Atoms/Hidden";
import { Environment } from "../../utils/environment";
import { H4 } from "../Atoms/Heading";
import { NumberBadge } from "../Atoms/NumberBadge";

export const ShipUpgrade = ({ disabled = false, purchaseHandler, ship }: IProps) => {
  if (ship.available) {
    return <ShipPurchase ship={ship as IShipUpgrade} disabled={disabled} purchaseHandler={purchaseHandler} />;
  }
  return <ShipLocked ship={ship as ILockedTransaction} />;
};

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

const ShipPurchase = ({ disabled, purchaseHandler, ship }: IShipUpgradeProps) => (
  <PurchaseCard>
    <PurchaseCardDetail>
      <PurchaseCardTitle>{ship.detail.name}</PurchaseCardTitle>
      <DetailDescription>{ship.detail.description}</DetailDescription>
      <Hidden as="h3">Stats</Hidden>
      <ShipStats stats={ship.detail.stats} />
      {ship.actionToken && (
        <StyledTokenButton token={ship.actionToken} handler={purchaseHandler}>
          <CreditsButton amount={ship.cost} disabledOverride={disabled} />
        </StyledTokenButton>
      )}
    </PurchaseCardDetail>
    <PurchaseCardImage notificationCount={ship.currentCount}>
      <ShipImage>
        <img src={`${Environment.clientApiHostname}${ship.detail.image}`} alt={ship.detail.name} />
      </ShipImage>
    </PurchaseCardImage>
  </PurchaseCard>
);

interface IProps {
  disabled?: boolean;
  ship?: IShipUpgrade | ILockedTransaction;
  purchaseHandler: (token: IActionToken) => void;
}

interface IShipUpgradeProps {
  disabled: boolean;
  ship: IShipUpgrade;
  purchaseHandler: (token: IActionToken) => void;
}

const PurchaseCard = styled.div`
  background: ${COLOURS.BLACK.FULL};
  padding: ${GRID.UNIT};
  border-radius: 8px;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
`;

const PurchaseCardDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const LockedPurchaseCardDetail = styled(PurchaseCardDetail)`
  justify-content: center;
  align-self: center;
  text-align: center;
`;

const PurchaseCardTitle = ({ children }: IChildrenProps) => <H4 as="h3">{children}</H4>;

const DetailDescription = styled(P)`
  flex: 1;
  margin: ${GRID.UNIT} 0;
  color: ${COLOURS.BODY.FADED};
`;

const StyledTokenButton = styled(TokenButton)`
  display: flex;
  justify-content: center;
  margin-top: ${GRID.UNIT};
`;

interface IPurchaseCardImageProps extends IChildrenProps {
  notificationCount?: number;
}

const PurchaseCardImage = React.memo(({ children, notificationCount }: IPurchaseCardImageProps) => {
  let countElement = null;
  if (notificationCount) {
    countElement = (
      <BadgePosition>
        <NumberBadge value={notificationCount} />
      </BadgePosition>
    );
  }

  return (
    <StyledPurchaseCardImage>
      {children}
      {countElement}
    </StyledPurchaseCardImage>
  );
});

const StyledPurchaseCardImage = styled.div`
  position: relative;
  width: 112px;
  margin: 0 auto ${GRID.UNIT} auto;
`;
const BadgePosition = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const ShipImage = styled.div`
  border-radius: 50%;
  background: ${COLOURS.GREY.DARKER};
  width: 112px;
  height: 112px;
`;

const Unknown = styled.div`
  font-size: 2rem;
  font-family: sans-serif;
  text-align: center;
  opacity: 0.4;
  line-height: 80px;
`;
