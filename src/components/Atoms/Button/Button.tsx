import * as React from "react";
import styled, { css } from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { MONOSPACE_FONT } from "../../../styles/typography";
import { AttackIcon } from "../../Icons/AttackIcon/AttackIcon";
import { TacticalIcon } from "../../Icons/TacticalIcon/TacticalIcon";

export enum Type {
  Confirm,
  Danger,
  Action,
  Warning,
}

const getColour = (styleType?: Type): string => {
  switch (styleType) {
    case Type.Confirm:
      return COLOURS.BUTTON.CONFIRM;
    case Type.Danger:
      return COLOURS.BUTTON.DANGER;
    case Type.Warning:
      return COLOURS.BUTTON.WARNING;
    case Type.Action:
      return COLOURS.BUTTON.ACTION;
    default:
      return COLOURS.BUTTON.STANDARD;
  }
};

interface IProps {
  styleType?: Type;
  href?: string;
  target?: string;
}

export const buttonColours = (styleType: Type) => css`
  border: solid 2px ${getColour(styleType)};
  color: ${getColour(styleType)};
  box-shadow: 0 0 16px ${getColour(styleType)}, 0 0 16px inset ${getColour(styleType)};
`;

export const Button = styled.button<IProps>`
  outline: none;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
  padding: ${GRID.HALF} ${GRID.UNIT};
  background: none;
  ${({ styleType }) => buttonColours(styleType)};
  border-radius: 4px;
  transition: all 0.15s linear;
  text-decoration: none;
  text-transform: uppercase;
  ${MONOSPACE_FONT};

  &[disabled] {
    opacity: 0.4;
  }
  &:not([disabled]) {
    &:hover,
    &:focus {
      box-shadow: 0 0 32px ${({ styleType }) => getColour(styleType)},
        0 0 16px inset ${({ styleType }) => getColour(styleType)};
      text-decoration: none;
    }
    &:active {
      box-shadow: 0 0 16px ${({ styleType }) => getColour(styleType)},
        0 0 16px inset ${({ styleType }) => getColour(styleType)};
      transform: scale(0.98);
      text-decoration: none;
    }
  }
`;

export const ConfirmButton = (props: any) => <Button {...props} styleType={Type.Confirm} />;

export const DangerButton = (props: any) => <Button {...props} styleType={Type.Danger} />;

export const ActionButton = (props: any) => <Button {...props} styleType={Type.Action} />;

export const WarningButton = (props: any) => <Button {...props} styleType={Type.Warning} />;

export const DisguisedButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  outline: none;
  user-select: none;
  &:not([disabled]) {
    cursor: pointer;
  }
`;

const iconButtonStyles = css`
  width: 40px;
  height: 40px;
  line-height: 0;
  padding: 4px 6px;
`;

const AttackDangerButton = styled(DangerButton)`
  ${iconButtonStyles};
`;

const TacticalConfirmButton = styled(ConfirmButton)`
  ${iconButtonStyles};
`;

export const AttackButton = (props: any) => (
  <AttackDangerButton {...props}>
    <AttackIcon />
  </AttackDangerButton>
);

export const TacticalButton = (props: any) => (
  <TacticalConfirmButton {...props}>
    <TacticalIcon />
  </TacticalConfirmButton>
);
