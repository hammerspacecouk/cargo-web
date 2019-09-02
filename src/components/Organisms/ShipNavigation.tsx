import * as React from "react";
import styled from "styled-components";
import { Crate } from "../Icons/Crate";
import { Icon, SMALL_ICON } from "../Atoms/Icon";
import { COLOURS } from "../../styles/colours";
import { DirectionsIcon } from "../Icons/DirectionsIcon";
import { ShipsIcon } from "../Icons/ShipsIcon";
import { TacticalIcon } from "../Icons/TacticalIcon";
import { EngineeringIcon } from "../Icons/EngineeringIcon";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { ACTIVE_VIEW } from "../../contexts/ActiveShipContext/useActiveShip";
import { IChildrenProps } from "../../interfaces";
import { Z_INDEX } from "../../styles/variables";
import { BREAKPOINTS } from "../../styles/media";

export const ShipNavigation = () => {
  return (
    <Nav>
      <List>
        <NavItem viewName={ACTIVE_VIEW.CARGO} label="Cargo"><Crate /></NavItem>
        <NavItem viewName={ACTIVE_VIEW.DIRECTIONS} label="Navigation"><DirectionsIcon /></NavItem>
        <NavItem viewName={ACTIVE_VIEW.TACTICAL} label="Tactical"><TacticalIcon /></NavItem>
        <NavItem viewName={ACTIVE_VIEW.SHIPS} label="Ships"><ShipsIcon /></NavItem>
        <NavItem viewName={ACTIVE_VIEW.ENGINEERING} label="Engineering"><EngineeringIcon /></NavItem>
      </List>
    </Nav>
  );
};


interface INavItemProps extends IChildrenProps {
  viewName: ACTIVE_VIEW;
  label: string;
}

const NavItem = ({ viewName, label, children }: INavItemProps) => {
  const { activeView, setActiveView } = useActiveShipContext();
  return (
    <Item>
      <NavLink isActive={activeView === viewName} href={`#${label.toLowerCase()}`}>
        <ButtonIcon size={SMALL_ICON} onClick={() => setActiveView(viewName)}>
          {children}
        </ButtonIcon>
        <Label>{label}</Label>
      </NavLink>
    </Item>
  );
};

const Nav = styled.nav`
    position: fixed;
    width: 100%;
    bottom: 0;
    background: ${COLOURS.BLACK.STANDARD};
    z-index: ${Z_INDEX.PAGE_TOP};
    padding-bottom: env(safe-area-inset-bottom);
    ${BREAKPOINTS.L`
      display: none;
    `};
}
`;

const List = styled.ul`
  display: flex;
  min-width: 44px;
  width: 100%;
  justify-content: space-between;
`;

const Item = styled.li`
  flex: 1;
  display: flex;
`;

const NavLink = styled.a<{isActive: boolean}>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 44px;
  padding: 4px 6px;
  opacity: ${({isActive}) => isActive ? '1' : '0.5'};
  color: ${COLOURS.WHITE.STANDARD};
  &:hover:not(:focus) {
    background: rgba(255,255,255,0.3);
  }
`;

const ButtonIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-top: 2px;
  font-size: 10px;
`;
