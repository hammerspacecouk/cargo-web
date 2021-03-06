import * as React from "react";
import styled from "styled-components";
import { ActionButton } from "@src/components/Atoms/Button";
import { Icon } from "@src/components/Atoms/Icon";

interface IProps {
  readonly icon?: JSX.Element;
  readonly children?: JSX.Element;
  readonly disabled?: boolean;
  readonly type: string;
  readonly className?: string;
  readonly onClick?: any;
}

const StyledButton = styled(ActionButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledChildren = styled.span`
  display: block;
`;

const StyledIcon = styled(StyledChildren)``;

// todo - delete this file
export const StackedButton = React.memo(({ icon, children, className, ...props }: IProps) => {
  let styledPrefix;
  if (icon) {
    styledPrefix = (
      <StyledIcon>
        <Icon>{icon}</Icon>
      </StyledIcon>
    );
  }

  return (
    <StyledButton className={className} {...props}>
      {styledPrefix}
      {children}
    </StyledButton>
  );
});
