import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { Crate } from "@src/components/Icons/Crate";
import { Icon, NORMAL_ICON, SMALL_ICON } from "@src/components/Atoms/Icon";
import { COLOURS, hexToRGBa } from "@src/styles/colours";
import { DirectionsIcon } from "@src/components/Icons/DirectionsIcon";
import { ShipsIcon } from "@src/components/Icons/ShipsIcon";
import { TacticalIcon } from "@src/components/Icons/TacticalIcon";
import { EngineeringIcon } from "@src/components/Icons/EngineeringIcon";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { ACTIVE_VIEW } from "@src/contexts/ActiveShipContext/useActiveShip";
import { IChildrenProps } from "@src/interfaces";
import { DisguisedButton } from "@src/components/Atoms/Button";
import { BREAKPOINTS } from "@src/styles/media";
import { useTutorial } from "@src/hooks/useTutorial";
import { Badge } from "@src/components/Atoms/Badge";

export const ShipNavigation = () => {
  const { ship, cratesOnShip } = useActiveShipContext();
  const {
    allowNavigation,
    allowTactical,
    allowShips,
    allowExtras,
    showCrateIntro,
    showNavigationIntro,
  } = useTutorial();

  let badge;
  if (ship.shipClass.capacity && cratesOnShip.length < ship.shipClass.capacity) {
    badge = `!`;
  }

  return (
    <Nav>
      <List>
        <NavItem viewName={ACTIVE_VIEW.CARGO} label="Cargo" tutorialHighlight={showCrateIntro} badge={badge}>
          <Crate colour="inherit" />
        </NavItem>
        <NavItem
          viewName={ACTIVE_VIEW.NAVIGATION}
          label="Navigation"
          tutorialHighlight={showNavigationIntro}
          disabled={!allowNavigation}
        >
          <DirectionsIcon />
        </NavItem>
        <NavItem viewName={ACTIVE_VIEW.TACTICAL} label="Tactical" disabled={!allowTactical}>
          <TacticalIcon />
        </NavItem>
        <NavItem viewName={ACTIVE_VIEW.SHIPS} label="Ships" disabled={!allowShips}>
          <ShipsIcon />
        </NavItem>
        <NavItem viewName={ACTIVE_VIEW.ENGINEERING} label="Engineering" disabled={!allowExtras}>
          <EngineeringIcon />
        </NavItem>
      </List>
    </Nav>
  );
};

interface INavItemProps extends IChildrenProps {
  disabled?: boolean;
  tutorialHighlight?: boolean;
  viewName: ACTIVE_VIEW;
  label: string;
  badge?: string;
}

const NavItem = ({ viewName, disabled, tutorialHighlight, label, children, badge }: INavItemProps) => {
  const { activeView, setActiveView } = useActiveShipContext();
  return (
    <Item>
      <NavLink
        tutorialHighlight={tutorialHighlight}
        disabled={disabled}
        isActive={activeView === viewName}
        onClick={() => !disabled && setActiveView(viewName)}
      >
        <ButtonIcon>
          {children}
          {badge && <StyledBadge color={COLOURS.SEMANTIC.DANGER.BACKGROUND}>{badge}</StyledBadge>}
        </ButtonIcon>
        <Label>{label}</Label>
      </NavLink>
    </Item>
  );
};

const StyledBadge = styled(Badge)`
  position: absolute;
  top: -8px;
  left: 100%;
`;

const Nav = styled.nav`
    background: ${COLOURS.BLACK.STANDARD};
    padding-bottom: env(safe-area-inset-bottom);
}
`;

const List = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Item = styled.li`
  flex: 1;
  display: flex;
  min-width: 44px;
  position: relative;
`;

const tutorialHighlightAnimation = keyframes`
  0% {
    color: ${COLOURS.WHITE.STANDARD};
    background: ${hexToRGBa(COLOURS.TUTORIAL.BACKGROUND, 0)};
  }
  50% {
    color: ${COLOURS.BLACK.STANDARD};
    background: ${hexToRGBa(COLOURS.TUTORIAL.BACKGROUND, 1)};
  }
  100% {
    color: ${COLOURS.WHITE.STANDARD};
    background: ${hexToRGBa(COLOURS.TUTORIAL.BACKGROUND, 0)};
  }
`;

const NavLink = styled(DisguisedButton)<{ disabled?: boolean; isActive: boolean; tutorialHighlight?: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 44px;
  padding: 6px;
  color: ${({ isActive }) => (isActive ? COLOURS.BUTTON.ACTION : COLOURS.WHITE.STANDARD)};
  ${({ tutorialHighlight, isActive }) =>
    !isActive &&
    tutorialHighlight &&
    css`
      animation: ${tutorialHighlightAnimation} 2s ease-in-out infinite;
    `};
  ${({ disabled }) =>
    disabled &&
    `
    cursor: none;
    opacity: 0.2;
  `};
  &:hover:not(:focus):not([disabled]) {
    background: rgba(255, 255, 255, 0.3);
  }
  ${BREAKPOINTS.L`
    min-height: 64px;
  `};
  svg,
  label {
    opacity: ${({ isActive }) => (isActive ? "1" : "0.5")};
  }
`;

const ButtonIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${SMALL_ICON};
  width: ${SMALL_ICON};
  position: relative;
  ${BREAKPOINTS.L`
    height: ${NORMAL_ICON};
    width: ${NORMAL_ICON};
  `};
`;

const Label = styled.label`
  margin-top: 2px;
  font-size: 10px;
  ${BREAKPOINTS.L`
    font-size: 13px;
  `};
`;
