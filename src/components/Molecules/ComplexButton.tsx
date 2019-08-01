import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { Icon } from "../Atoms/Icon";
import { ActionButton } from "../Atoms/Button";

interface IProps {
  readonly leading?: JSX.Element;
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
`;

const StyledChildren = styled.div`
  margin-right: ${GRID.UNIT};
  padding-right: ${GRID.UNIT};
  border-right-style: solid;
  border-right-width: 1px;
`;

const StyledIcon = styled(StyledChildren)`
  line-height: 0;
  padding-right: ${GRID.HALF};
  margin-left: -${GRID.HALF};
`;

export const ComplexButton = React.memo(({ leading, icon, children, className, ...props }: IProps) => {
  let styledPrefix;
  if (leading) {
    styledPrefix = <StyledChildren>{leading}</StyledChildren>;
  }
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
