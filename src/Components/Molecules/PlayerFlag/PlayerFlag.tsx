import * as React from "react";
import PlayerInterface from "../../../interfaces/PlayerInterface";
import { Environment } from "../../../util/Environment";
import styled from "styled-components";
import { colours } from "../../../GlobalStyle";

export interface Props {
  player: PlayerInterface;
}

// ratio is 2:1
const StyledBox = styled.div`
    line-height: 0;
    height: 0;
    overflow: hidden;
    padding-top: 50%;
    position: relative;
    background: ${colours.black};
`;
const StyledImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export default function PlayerFlag({ player }: Props) {
  let img;
  if (player) {
    img = <StyledImg src={`${Environment.apiHostname}${player.emblem}`} alt="" />;
  }
  return <StyledBox>{img}</StyledBox>;
};
