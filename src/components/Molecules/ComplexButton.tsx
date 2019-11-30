import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { Icon, SMALL_ICON } from "../Atoms/Icon";
import { Button, Type } from "../Atoms/Button";
import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon?: ReactNode;
  readonly styleType?: Type;
  readonly suffixed?: boolean;
}

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  line-height: 1;
`;

const StyledIcon = styled(Icon)<{ suffixed: boolean }>`
  ${({ suffixed }) => `margin-${suffixed ? "left" : "right"}: 4px`};
`;

export const ComplexButton = React.memo(({ icon, children, suffixed, styleType = Type.Action, ...props }: IProps) => {
  let styledPrefix;
  let styledSuffix;
  if (icon) {
    const iconElement = (
      <StyledIcon size={SMALL_ICON} suffixed={suffixed}>
        {icon}
      </StyledIcon>
    );
    if (suffixed) {
      styledSuffix = iconElement;
    } else {
      styledPrefix = iconElement;
    }
  }

  return (
    <StyledButton styleType={styleType} {...props}>
      {styledPrefix}
      {children}
      {styledSuffix}
    </StyledButton>
  );
});
