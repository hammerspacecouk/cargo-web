import * as React from "react";
import PlayerInterface from "../../../interfaces/PlayerInterface";
import { Environment } from "../../../util/Environment";
import styled from "styled-components";
import { colours } from "../../../GlobalStyle";

export interface Props {
  player: PlayerInterface;
  className?: string;
}

const StyledBox = styled.div`
    border-radius: 50%;
    background: ${colours.black};
    padding-bottom: 100%;
`;
const StyledImg = styled.img`
    border-radius: 50%;
    background: ${colours.black};
`;

export default function PlayerFlag({ player, className }: Props) {
  if (player) {
    return <StyledImg as="img" className={className} src={`${Environment.apiHostname}${player.emblem}`} alt="" />;
  }
  return <StyledBox />;
};
