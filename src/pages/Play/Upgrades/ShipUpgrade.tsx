import * as React from "react";
import styled from "styled-components";
import { useUpgradesContext } from "../../../context/Page/UpgradesContext";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { CreditsButton } from "../../../components/Molecules/CreditsButton/CreditsButton";
import { ShipUpgradeInterface } from "../../../Interfaces";
import { Environment } from "../../../util/Environment";
import { TextCenter } from "../../../components/Atoms/Text/Text";

interface PropsInterface {
  ship?: ShipUpgradeInterface;
}

const ShipImage = styled.div`
  max-width: 160px;
`;

export default ({ ship }: PropsInterface) => {
  const { buttonsDisabled, makePurchase } = useUpgradesContext();

  if (!ship) {
    return <div>LOCKED</div>; // todo - design this
  }

  // todo - show the ship strengths
  return (
    <TextCenter>
      <h3>
        {ship.detail.name} ({ship.currentCount})
      </h3>
      <ShipImage>
        <img src={`${Environment.apiHostname}${ship.detail.image}`} alt="" />
      </ShipImage>
      <p>{ship.detail.description}</p>
      <p>Capacity: {ship.detail.capacity}</p>
      <TokenButton token={ship.actionToken} handler={makePurchase}>
        <CreditsButton amount={ship.cost} disabledOverride={buttonsDisabled} />
      </TokenButton>
    </TextCenter>
  );
};
