import * as React from "react";
import styled from "styled-components";
import { IClassNameProps, IPort } from "@src/interfaces";
import { GRID } from "@src/styles/variables";
import { SanctuaryIcon } from "@src/components/Icons/SanctuaryIcon";
import { HomeIcon } from "@src/components/Icons/HomeIcon";
import { Blockade } from "@src/components/Icons/BlockadeIcon";

export const PortName = React.memo(({ port, isHome = false, className }: IProps) => {
  let safeIndicator = null;
  let homeIndicator = null;
  let blockadeIndicator = null;
  if (port.isSafe) {
    safeIndicator = (
      <Icon title="Safe Zone">
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
  if (port.blockade) {
    blockadeIndicator = (
      <Icon title="Blockaded">
        <Blockade />
      </Icon>
    );
  }
  return (
    <Styled className={className}>
      {port.name}
      {safeIndicator}
      {blockadeIndicator}
      {homeIndicator}
    </Styled>
  );
});

interface IProps extends IClassNameProps {
  port: IPort;
  isHome?: boolean;
}

const Styled = styled.span`
  display: inline-block;
`;
const Icon = styled.abbr`
  display: inline-block;
  margin-left: ${GRID.HALF};
  width: 1em;
  height: 1em;
  vertical-align: middle;
`;
