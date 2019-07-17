import * as React from "react";
import styled from "styled-components";
import { PlaceholderContents } from "../../Atoms/CrateContents";
import { CrateButton } from "../../Atoms/HaloButton";
import { CratePickup } from "../../Molecules/CratePickup";
import { TokenButton } from "../../Molecules/TokenButton";
import { ICrateAction } from "../../../interfaces";
import { GRID } from "../../../styles/variables";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";
import { animate } from "../../Atoms/PlaceHolder";

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
