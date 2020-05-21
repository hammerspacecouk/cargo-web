import * as React from "react";
import styled from "styled-components";
import { PlaceholderContents } from "@src/components/Atoms/CrateContents";
import { CrateButton } from "@src/components/Atoms/HaloButton";
import { CratePickup } from "@src/components/Molecules/CratePickup";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { ICrateAction } from "@src/interfaces";
import { GRID } from "@src/styles/variables";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { animate } from "@src/components/Atoms/PlaceHolder";

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
