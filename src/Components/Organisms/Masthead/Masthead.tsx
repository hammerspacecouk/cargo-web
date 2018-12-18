import * as React from "react";
import { useSessionContext } from "../../../context/SessionContext";
import { PlayerActions } from "./PlayerActions";
import { GuestActions } from "./GuestActions";
import styled from "styled-components";
import { GRID, Z_INDEX } from "../../../styles/variables";
import { COLOURS, hexToRGBa } from "../../../styles/colours";
import { SIZES } from "../../../styles/typography";
import { HaloLink } from "../../Atoms/HaloLink/HaloLink";
import { FlexStretch } from "../../Atoms/Flex/Flex";

const MastheadPosition = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: ${COLOURS.BODY.BACKGROUND};
  z-index: ${Z_INDEX.OVERLAY_BOTTOM};
  border-bottom: solid 1px ${hexToRGBa(COLOURS.BODY.TEXT, 0.6)};
`;

const StyledMasthead = styled.div`
  color: ${COLOURS.BODY.TEXT};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

export const LinkBox = styled.div`
  display: flex;
  height: 100%;
  > a,
  button {
    display: flex;
    align-items: center;
    padding: ${GRID.UNIT};
  }
`;

const MastheadLink = styled(HaloLink)`
  padding: ${GRID.UNIT};
  display: flex;
  align-items: center;
`;
const Logo = styled(MastheadLink)`
  ${SIZES.D};
`;

export const Masthead = () => {
  const { player } = useSessionContext();

  return (
    <MastheadPosition>
      <StyledMasthead>
        <Logo href="/">Planet Cargo</Logo>
        <FlexStretch>
          {player ? <PlayerActions /> : <GuestActions />}
        </FlexStretch>
      </StyledMasthead>
    </MastheadPosition>
  );
};
