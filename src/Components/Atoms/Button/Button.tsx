import * as React from "react";
import styled from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";

export const TYPE_CONFIRM = "confirm";
export const TYPE_DANGER = "danger";
export const TYPE_ACTION = "action";

const getColour = (styleType: string): string => {
  switch (styleType) {
    case TYPE_CONFIRM:
      return COLOURS.BUTTON.CONFIRM;
    case TYPE_DANGER:
      return COLOURS.BUTTON.DANGER;
    case TYPE_ACTION:
      return COLOURS.BUTTON.ACTION;
    default:
      return COLOURS.BUTTON.STANDARD;
  }
};

interface IProps {
  styleType?: string;
  href?: string;
  target?: string;
}

export const Button = styled.button<PropsInterface>`
  outline: none;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
  padding: ${GRID.HALF} ${GRID.UNIT};
  background: none;
  border: solid 2px ${({ styleType }) => getColour(styleType)};
  color: ${({ styleType }) => getColour(styleType)};
  box-shadow: 0 0 16px ${({ styleType }) => getColour(styleType)},
    0 0 16px inset ${({ styleType }) => getColour(styleType)};
  border-radius: 4px;
  transition: all 0.15s linear;
  text-decoration: none;

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

export const ConfirmButton = (props: any) => (
  <Button {...props} styleType={TYPE_CONFIRM} />
);

export const DangerButton = (props: any) => (
  <Button {...props} styleType={TYPE_DANGER} />
);

export const ActionButton = (props: any) => (
  <Button {...props} styleType={TYPE_ACTION} />
);
