import * as React from "react";
import styled from "styled-components";
import { TextD } from "../Atoms/Text";
import { Icon, SMALL_ICON } from "../Atoms/Icon";
import { GRID } from "../../styles/variables";
import { TickIcon } from "../Icons/TickIcon";
import { COLOURS } from "../../styles/colours";
import { CloseIcon } from "../Icons/CloseIcon";
import { IChildrenProps } from "../../interfaces";

export const WinRequirement = ({ achieved, children }: IProps) => {
  let IndicatorIcon, color;
  if (achieved) {
    IndicatorIcon = TickIcon;
    color = COLOURS.SEMANTIC.OK.KEY;
  } else {
    IndicatorIcon = CloseIcon;
    color = COLOURS.SEMANTIC.DANGER.KEY;
  }

  return (
    <StyledRequirement>
      <StyledIcon color={color}>
        <Icon size={SMALL_ICON}>
          <IndicatorIcon />
        </Icon>
      </StyledIcon>
      <Text>{children}</Text>
    </StyledRequirement>
  );
};

interface IProps extends IChildrenProps {
  achieved: boolean;
}
const StyledIcon = styled.div<{ color: string }>`
  margin-right: ${GRID.HALF};
  color: ${({ color }) => color};
  line-height: 0;
`;

const StyledRequirement = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled(TextD)`
  flex: 1;
`;
