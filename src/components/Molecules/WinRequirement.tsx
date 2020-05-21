import * as React from "react";
import styled from "styled-components";
import { TextD } from "@src/components/Atoms/Text";
import { Icon, SMALL_ICON } from "@src/components/Atoms/Icon";
import { GRID } from "@src/styles/variables";
import { TickIcon } from "@src/components/Icons/TickIcon";
import { COLOURS } from "@src/styles/colours";
import { CloseIcon } from "@src/components/Icons/CloseIcon";
import { IChildrenProps } from "@src/interfaces";

export const WinRequirement = React.memo(({ achieved, children }: IProps) => {
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
});

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
