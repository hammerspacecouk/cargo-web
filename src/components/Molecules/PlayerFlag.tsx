import * as React from "react";
import styled from "styled-components";
import { IPlayer } from "../../interfaces";
import { COLOURS } from "../../styles/colours";
import { Environment } from "../../utils/environment";

export const PlayerFlag = React.memo(({ player, className }: IProps) => {
  if (player) {
    return <StyledImg as="img" className={className} src={`${Environment.clientApiHostname}${player.emblem}`} alt="" />;
  }
  return <StyledBox />;
});

interface IProps {
  player: IPlayer;
  className?: string;
}

const StyledBox = styled.div`
  border-radius: 50%;
  background: ${COLOURS.BLACK.STANDARD};
  padding-bottom: 100%;
`;
const StyledImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background: ${COLOURS.BLACK.STANDARD};
`;
