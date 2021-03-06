import * as React from "react";
import styled, { css } from "styled-components";
import { COLOURS } from "@src/styles/colours";
import { GRID } from "@src/styles/variables";
import { MONOSPACE_FONT } from "@src/styles/typography";
import { AttackIcon } from "@src/components/Icons/AttackIcon";
import { CloseIcon } from "@src/components/Icons/CloseIcon";
import { AddIcon } from "@src/components/Icons/AddIcon";
import { EditIcon } from "@src/components/Icons/EditIcon";

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

export const buttonColours = (styleType?: Type) => css`
  border: solid 2px ${getColour(styleType)};
  color: ${getColour(styleType)};
  box-shadow: 0 0 16px ${getColour(styleType)}, 0 0 16px inset ${getColour(styleType)};
  &:hover,
  &:active,
  &:focus {
    color: ${getColour(styleType)};
  }
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

export const ConfirmButton = React.memo(
  React.forwardRef((props: any, ref: React.Ref<any>) => <Button ref={ref} {...props} styleType={Type.Confirm} />)
);

export const DangerButton = React.memo(
  React.forwardRef((props: any, ref: React.Ref<any>) => <Button ref={ref} {...props} styleType={Type.Danger} />)
);

export const ActionButton = React.memo(
  React.forwardRef((props: any, ref: React.Ref<any>) => <Button ref={ref} {...props} styleType={Type.Action} />)
);

export const WarningButton = React.memo(
  React.forwardRef((props: any, ref: React.Ref<any>) => <Button ref={ref} {...props} styleType={Type.Warning} />)
);

export const DisguisedButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  outline: none;
  user-select: none;
  text-align: left;
  &:not([disabled]) {
    cursor: pointer;
  }
`;

const iconButtonStyles = css`
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 0;
  padding: 4px 6px;
`;

const IconDangerButton = styled(DangerButton)`
  ${iconButtonStyles};
`;

const IconConfirmButton = styled(ConfirmButton)`
  ${iconButtonStyles};
`;

const IconActionButton = styled(ActionButton)`
  ${iconButtonStyles};
`;

export const AttackButton = React.memo((props: any) => (
  <IconDangerButton {...props}>
    <AttackIcon />
  </IconDangerButton>
));

export const AddButton = React.memo((props: any) => (
  <IconConfirmButton title="Add" {...props}>
    <AddIcon />
  </IconConfirmButton>
));

export const RemoveButton = React.memo((props: any) => (
  <IconDangerButton title="Remove" {...props}>
    <CloseIcon />
  </IconDangerButton>
));

export const EditButton = React.memo((props: any) => (
  <IconActionButton title="Edit" {...props}>
    <EditIcon />
  </IconActionButton>
));
