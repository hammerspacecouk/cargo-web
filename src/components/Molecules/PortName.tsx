import * as React from "react";
import styled from "styled-components";
import { IClassNameProps, IPort } from "../../interfaces";
import { GRID } from "../../styles/variables";
import { SanctuaryIcon } from "../Icons/SanctuaryIcon";
import { HomeIcon } from "../Icons/HomeIcon";

export const PortName = React.memo(({ port, isHome = false, className }: IProps) => {
  let safeIndicator = null;
  let homeIndicator = null;
  if (port.isSafe) {
    safeIndicator = (
      <Icon title="Sanctuary">
        <SanctuaryIcon />
      </Icon>
    );
  }
  if (isHome) {
    homeIndicator = (
      <Icon title="Home space port">
        <HomeIcon />
      </Icon>
    );
  }
  return (
    <Styled className={className}>
      <Text>{port.name}</Text>
      {safeIndicator}
      {homeIndicator}
    </Styled>
  );
});

interface IProps extends IClassNameProps{
  port: IPort;
  isHome?: boolean;
}

const Styled = styled.span`
  display: flex;
  align-items: center;
`;
const Text = styled.span`
  display: inline-block;
`;
const Icon = styled.abbr`
  display: inline-block;
  margin-left: ${GRID.HALF};
  width: 1em;
  height: 1em;
`;
