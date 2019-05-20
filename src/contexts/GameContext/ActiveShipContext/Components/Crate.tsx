import * as React from "react";
import styled from "styled-components";
import { PlaceholderContents } from "../../../../components/Atoms/CrateContents/CrateContents";
import { CrateButton } from "../../../../components/Atoms/HaloButton/HaloButton";
import { CratePickup } from "../../../../components/Molecules/CratePickup/CratePickup";
import { TokenButton } from "../../../../components/Molecules/TokenButton/TokenButton";
import { ICrateAction } from "../../../../Interfaces";
import { GRID } from "../../../../styles/variables";
import { useActiveShipContext } from "../ActiveShipContext";
import { animate } from "../../../../components/Atoms/Placeholder/PlaceHolder";

interface ICrateOnShipProps {
  crateAction: ICrateAction;
}

const StyledCrate = styled.div`
  display: flex;
  > * {
    flex: 1;
  }
`;

const StyledPlaceholder = styled.div<{ loading: boolean }>`
  padding: ${GRID.HALF};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ loading }) => loading && animate}
`;

export const Crate = ({ crateAction }: ICrateOnShipProps) => {
  const { buttonsDisabled, portActionHandler } = useActiveShipContext();

  const CrateContent = <CratePickup crateAction={crateAction} />;

  let tokenButton = <CrateButton disabled={true}>{CrateContent}</CrateButton>;
  if (crateAction.token) {
    tokenButton = (
      <TokenButton token={crateAction.token} handler={portActionHandler}>
        <CrateButton type="submit" disabled={buttonsDisabled}>
          {CrateContent}
        </CrateButton>
      </TokenButton>
    );
  }

  return <StyledCrate>{tokenButton}</StyledCrate>;
};

export const CratePlaceholder = ({ loading }: { loading: boolean }) => {
  return (
    <StyledPlaceholder loading={loading}>
      <PlaceholderContents />
    </StyledPlaceholder>
  );
};
