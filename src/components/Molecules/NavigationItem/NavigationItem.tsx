import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "../../../styles/variables";
import { COLOURS, hexToRGBa } from "../../../styles/colours";
import { Icon, TINY_ICON } from "../../Atoms/Icon/Icon";
import { ChevronRightIcon } from "../../Icons/ChevronRightIcon/ChevronRightIcon";
import { SIZES } from "../../../styles/typography";

interface IProps {
  path: string;
  text: string;
  icon: JSX.Element;
}

const StyledItem = styled(Link)`
  display: flex;
  padding: 0 ${GRID.UNIT};
  height: ${NAV_ITEM_HEIGHT};
  align-items: center;
  color: ${COLOURS.WHITE.STANDARD};
  &:hover,
  &:active,
  &:focus {
    background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.1)};
    text-decoration: none;
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: ${GRID.UNIT};
`;

const Text = styled.span`
  flex: 1;
  display: inline-block;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  ${SIZES.E};
`;

const ArrowIcon = styled(Icon)`
  opacity: 0.5;
`;

export const NavigationItem = ({ path, text, icon }: IProps) => {
  return (
    <StyledItem to={path}>
      <StyledIcon>{icon}</StyledIcon>
      <Text>{text}</Text>
      <ArrowIcon size={TINY_ICON}>
        <ChevronRightIcon />
      </ArrowIcon>
    </StyledItem>
  );
};
