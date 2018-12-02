import * as React from "react";
import styled from "styled-components";
import Button from "../../Atoms/Button/Button";
import { grid } from "../../../GlobalStyle";
import Icon from "../../Atoms/Icon/Icon";

interface PropsInterface {
  readonly leading?: JSX.Element;
  readonly icon?: JSX.Element;
  readonly children?: JSX.Element;
  readonly disabled?: boolean;
  readonly type: string;
  readonly className?: string;
  readonly onClick?: any;
}

const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
`;

const StyledChildren = styled.div`
    margin-right: ${grid.unit}px;
    padding-right: ${grid.unit}px;
    border-right-style: solid;
    border-right-width: 1px;
`;

const StyledIcon = styled(StyledChildren)`
    line-height: 0;
    padding-right: ${grid.half}px;
    margin-left: -${grid.half}px;
`;

export default function ComplexButton(
  { leading, icon, children, disabled, type, className, onClick }: PropsInterface
) {
  let styledPrefix;
  if (leading) {
    styledPrefix = (
      <StyledChildren>
        {leading}
      </StyledChildren>
    );
  }
  if (icon) {
    styledPrefix = (
      <StyledIcon>
        <Icon>
          {icon}
        </Icon>
      </StyledIcon>
    );
  }

  return (
    <StyledButton
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {styledPrefix}
      {children}
    </StyledButton>
  );
}
