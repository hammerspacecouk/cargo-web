import * as React from "react";
import styled from "styled-components";
import { IPlayer } from "../../../Interfaces";
import { COLOURS } from "../../../styles/colours";
import { Environment } from "../../../util/Environment";

export interface IProps {
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
  background: ${COLOURS.BLACK.STANDARD}
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0) 100%
    );
`;

export const PlayerFlag = ({ player, className }: IProps) => {
  if (player) {
    return (
      <StyledImg
        as="img"
        className={className}
        src={`${Environment.apiHostname}${player.emblem}`}
        alt=""
      />
    );
  }
  return <StyledBox />;
};
