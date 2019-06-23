import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "../../styles/variables";
import { COLOURS, hexToRGBa } from "../../styles/colours";
import { Icon, TINY_ICON } from "../Atoms/Icon";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";
import { SIZES } from "../../styles/typography";

interface IProps {
  path: {
    href: string;
    as?: string;
  };
  text: string;
  icon: JSX.Element;
  isCurrent: boolean;
}

const StyledItem = styled.div<{ isCurrent: boolean }>`
  display: flex;
  padding: 0 ${GRID.UNIT} 0 ${GRID.HALF};
  border-left: solid transparent ${GRID.HALF};
  height: ${NAV_ITEM_HEIGHT};
  align-items: center;
  color: ${COLOURS.WHITE.STANDARD};
  &:hover,
  &:active,
  &:focus {
    background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.1)};
    text-decoration: none;
  }
  ${({ isCurrent }) =>
    isCurrent &&
    `
    border-left-color: ${COLOURS.ACTIVE_HIGHLIGHT};
  `}
`;

const StyledIcon = styled(Icon)`
  margin-right: ${GRID.UNIT};
`;

const Text = styled.span`
  flex: 1;
  display: inline-block;
  overflow-x: hidden;
  text-overflow: ellipsis;
  ${SIZES.E};
`;

const ArrowIcon = styled(Icon)`
  opacity: 0.5;
`;

export const NavigationItem = ({ path, text, icon, isCurrent }: IProps) => {
  return (
    <Link href={path.href} as={path.as}>
      <StyledItem isCurrent={isCurrent}>
        <StyledIcon>{icon}</StyledIcon>
        <Text>{text}</Text>
        <ArrowIcon size={TINY_ICON}>
          <ChevronRightIcon />
        </ArrowIcon>
      </StyledItem>
    </Link>
  );
};
