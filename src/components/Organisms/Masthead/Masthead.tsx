import * as React from "react";
import styled from "styled-components";
import { useSessionContext } from "../../../context/SessionContext";
import { COLOURS, hexToRGBa } from "../../../styles/colours";
import { Z_INDEX } from "../../../styles/variables";
import { GuestActions } from "./GuestActions";
import { PlayerActions } from "./PlayerActions";

const MastheadPosition = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: ${COLOURS.BODY.BACKGROUND};
  z-index: ${Z_INDEX.OVERLAY_BOTTOM};
  border-bottom: solid 1px ${hexToRGBa(COLOURS.BODY.TEXT, 0.6)};
  height: 44px;
`;

const StyledMasthead = styled.div`
  color: ${COLOURS.BODY.TEXT};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

export const Masthead = () => {
  const { player } = useSessionContext();

  return (
    <MastheadPosition>
      <StyledMasthead>
        {player ? <PlayerActions/> : <GuestActions/>}
      </StyledMasthead>
    </MastheadPosition>
  );
};
