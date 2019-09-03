import * as React from "react";
import styled from "styled-components";
import { Crate } from "../Icons/Crate";
import { Icon, NORMAL_ICON, SMALL_ICON } from "../Atoms/Icon";
import { COLOURS } from "../../styles/colours";
import { DirectionsIcon } from "../Icons/DirectionsIcon";
import { ShipsIcon } from "../Icons/ShipsIcon";
import { TacticalIcon } from "../Icons/TacticalIcon";
import { EngineeringIcon } from "../Icons/EngineeringIcon";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { ACTIVE_VIEW } from "../../contexts/ActiveShipContext/useActiveShip";
import { IChildrenProps } from "../../interfaces";
import { DisguisedButton } from "../Atoms/Button";
import { BREAKPOINTS } from "../../styles/media";

export const ShipNavigation = () => {
  return (
    <Nav>
      <List>
        <NavItem viewName={ACTIVE_VIEW.CARGO} label="Cargo"><Crate colour="inherit" /></NavItem>
        <NavItem viewName={ACTIVE_VIEW.NAVIGATION} label="Navigation"><DirectionsIcon /></NavItem>
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
      <NavLink isActive={activeView === viewName} onClick={() => setActiveView(viewName)}>
        <ButtonIcon>
          {children}
        </ButtonIcon>
        <Label>{label}</Label>
      </NavLink>
    </Item>
  );
};


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
`;

const NavLink = styled(DisguisedButton)<{isActive: boolean}>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 44px;
  padding: 6px;
  opacity: ${({isActive}) => isActive ? '1' : '0.5'};
  color: ${({isActive}) => isActive ? COLOURS.BUTTON.ACTION : COLOURS.WHITE.STANDARD};
  &:hover:not(:focus) {
    background: rgba(255,255,255,0.3);
  }
`;

const ButtonIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${SMALL_ICON};
  width: ${SMALL_ICON};
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
