import * as React from "react";
import styled from "styled-components";
import { CreditsButton } from "../../../contexts/GameContext/Components/CreditsButton";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { useUpgradesContext } from "../../../context/Page/UpgradesContext";
import { IShipUpgrade } from "../../../Interfaces";
import { Environment } from "../../../util/Environment";
import {
  PurchaseCard,
  PurchaseCardDescription,
  PurchaseCardDetail,
  PurchaseCardImage,
  PurchaseCardTitle,
} from "../../../components/Molecules/PurchaseCard/PurchaseCard";
import { P } from "../../../components/Atoms/Text/Text";
import { GRID } from "../../../styles/variables";
import { BREAKPOINTS } from "../../../styles/media";

interface IProps {
  ship?: IShipUpgrade;
}

const ShipImage = styled(PurchaseCardImage)`
  width: 48px;
  ${BREAKPOINTS.S`
      width: 128px;
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

export const ShipUpgrade = ({ ship }: IProps) => {
  const { buttonsDisabled, makePurchase } = useUpgradesContext();

  if (!ship) {
    return (
      <PurchaseCard>
        <PurchaseCardDetail>
          <PurchaseCardTitle>Locked</PurchaseCardTitle>
        </PurchaseCardDetail>
        <ShipImage>
          <Unknown>?</Unknown>
        </ShipImage>
      </PurchaseCard>
    );
  }

  // todo - show the ship strengths
  return (
    <PurchaseCard>
      <PurchaseCardDetail>
        <PurchaseCardTitle>{ship.detail.name}</PurchaseCardTitle>
        <PurchaseCardDescription>
          <P>{ship.detail.description}</P>
          <ShipStats>
            <ShipStat
              label="Capacity"
              value={ship.detail.capacity.toString(10)}
            />
            <ShipStat
              label="Strength"
              value={ship.detail.strength.toString(10)}
            />
          </ShipStats>
        </PurchaseCardDescription>
        <TokenButton token={ship.actionToken} handler={makePurchase}>
          <CreditsButton
            amount={ship.cost}
            disabledOverride={buttonsDisabled}
          />
        </TokenButton>
      </PurchaseCardDetail>
      <ShipImage notificationCount={ship.currentCount}>
        <img src={`${Environment.apiHostname}${ship.detail.image}`} alt="" />
      </ShipImage>
    </PurchaseCard>
  );
};
