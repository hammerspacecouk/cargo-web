import * as React from "react";
import { useSessionContext } from "../../../context/SessionContext";
import styled, { css } from "styled-components";
import { MASTHEAD_HEIGHT, Z_INDEX } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";
import { MainMenuList } from "../../Molecules/MainMenuList/MainMenuList";


const StyledNav = styled.nav<{isOpen: boolean}>`
    display: block;
    position: fixed;
    height: calc(100vh - ${MASTHEAD_HEIGHT + 1}px);
    width: 100%;
    top: ${MASTHEAD_HEIGHT}px;
    left: 0;
    right: 0;
    background: ${COLOURS.GREY.DARK};
    transform: translateX(-100%);
    transition: transform .3s cubic-bezier(0, .52, 0, 1);
    will-change: transform;
    overflow: auto;
    z-index: ${Z_INDEX.MENU};
    ${({isOpen}) => isOpen && css`transform: translateX(0%)`};
`;



export const Menu = () => {
  const { menuOpen, player } = useSessionContext();

  if (!player) {
    return null;
  }

  return (
    <StyledNav isOpen={menuOpen}>
      <MainMenuList />
    </StyledNav>
  );
};
