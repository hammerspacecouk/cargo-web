import * as React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "@src/styles/variables";
import { COLOURS, hexToRGBa } from "@src/styles/colours";
import { Icon, TINY_ICON } from "@src/components/Atoms/Icon";
import { ChevronRightIcon } from "@src/components/Icons/ChevronRightIcon";
import { SIZES } from "@src/styles/typography";
import { ReactNode } from "react";
import { tutorialHighlightAnimation } from "@src/components/Organisms/ShipNavigation";

export const NavigationItem = React.memo(({ path, text, subtext, icon, isCurrent, highlight }: IProps) => {
  return (
    <Link href={path.href} as={path.as} prefetch={false}>
      <StyledItem href={path.as || path.href} $isCurrent={isCurrent} $highlight={highlight}>
        <StyledIcon>{icon}</StyledIcon>
        <Detail>
          <Text>{text}</Text>
          {subtext && <SubText>{subtext}</SubText>}
        </Detail>
        <ArrowIcon size={TINY_ICON}>
          <ChevronRightIcon />
        </ArrowIcon>
      </StyledItem>
    </Link>
  );
});

interface IProps {
  path: {
    href: string;
    as?: string;
  };
  text?: ReactNode;
  subtext?: ReactNode;
  icon: JSX.Element;
  isCurrent: boolean;
  highlight?: boolean;
}

const StyledItem = styled.a<{ $isCurrent: boolean; $highlight: boolean }>`
  display: flex;
  padding: ${GRID.UNIT} ${GRID.UNIT} ${GRID.UNIT} ${GRID.HALF};
  border-left: solid transparent ${GRID.HALF};
  min-height: ${NAV_ITEM_HEIGHT};
  align-items: center;
  color: ${COLOURS.WHITE.STANDARD};
  transition: border-left-color 0.5s ease-in-out;
  &:hover,
  &:focus {
    background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.1)};
    text-decoration: none;
    color: ${COLOURS.WHITE.STANDARD};
  }
  &:active {
    text-decoration: none;
    background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.05)};
  }
  ${({ $isCurrent }) =>
    $isCurrent &&
    `
    border-left-color: ${COLOURS.ACTIVE_HIGHLIGHT};
  `}
  ${({ $highlight, $isCurrent }) =>
    $highlight &&
    !$isCurrent &&
    css`
      animation: ${tutorialHighlightAnimation} 2s ease-in-out infinite;
    `};
`;

const StyledIcon = styled(Icon)`
  width: 32px;
  margin-right: ${GRID.UNIT};
`;

const Detail = styled.span`
  flex: 1;
`;

const Text = styled.span`
  display: block;
  ${SIZES.E};
`;

const SubText = styled.span`
  display: block;
  opacity: 0.9;
  margin-top: 2px;
  ${SIZES.F};
`;

export const ArrowIcon = styled(Icon)`
  opacity: 0.5;
  margin-left: ${GRID.HALF};
`;
