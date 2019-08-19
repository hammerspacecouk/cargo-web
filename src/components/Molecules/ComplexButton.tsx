import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { Icon, SMALL_ICON } from "../Atoms/Icon";
import { Button, Type } from "../Atoms/Button";
import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon?: ReactNode;
  readonly styleType?: Type;
}

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  margin-right: 4px;
`;

export const ComplexButton = React.memo(({ icon, children, styleType = Type.Action, ...props }: IProps) => {
  let styledPrefix;
  if (icon) {
    styledPrefix = <StyledIcon size={SMALL_ICON}>{icon}</StyledIcon>;
  }

  return (
    <StyledButton styleType={styleType} {...props}>
      {styledPrefix}
      {children}
    </StyledButton>
  );
});
