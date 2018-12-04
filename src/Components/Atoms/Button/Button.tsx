import styled from "styled-components";
import { colours, grid } from "../../../GlobalStyle";

export const TYPE_CONFIRM = 'confirm';
export const TYPE_DANGER = 'danger';
export const TYPE_NEGATIVE = 'negative';

const getColour = (styleType: string): string => {
  switch (styleType) {
    case TYPE_CONFIRM:
      return colours.green[4];
    case TYPE_DANGER:
      return colours.red[5];
    case TYPE_NEGATIVE:
      return colours.cyan[3];
    default:
      return colours.white;
  }
};

export default styled.button<{styleType?: string, href?:string}>`
  outline: none;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
  padding: ${grid.half}px ${grid.unit}px;
  background: none;
  border: solid 2px ${({styleType}) => getColour(styleType)};
  color: ${({styleType}) => getColour(styleType)};
  box-shadow: 0 0 16px ${({styleType}) => getColour(styleType)}, 
    0 0 16px inset ${({styleType}) => getColour(styleType)};
  border-radius: 4px;
  transition: all .15s linear;
  text-decoration: none;
  
  &[disabled] {
    opacity: 0.4;
  }
  &:not([disabled]) {
    &:hover, &:focus {
      box-shadow: 0 0 32px ${({styleType}) => getColour(styleType)}, 
        0 0 16px inset ${({styleType}) => getColour(styleType)};
      text-decoration: none;
    }
    &:active {
      box-shadow: 0 0 16px ${({styleType}) => getColour(styleType)}, 
        0 0 16px inset ${({styleType}) => getColour(styleType)};
      transform: scale(0.98);
        text-decoration: none;
    }
  }
`;
