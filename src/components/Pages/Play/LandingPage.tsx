import * as React from "react";
import { PlayHome } from "./PlayHome";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../styles/media";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import { IProfileResponse } from "../../../data/profile";
import { Loading } from "../../Atoms/Loading";

const StyledArea = styled.div<{ hideDisplay: boolean }>`
  display: ${({ hideDisplay }) => (hideDisplay ? "none" : "block")};
  ${BREAKPOINTS.XL`
    display: block;
    height: 100%;
    overflow: auto;
  `};
`;

export const LandingPage = ({ profile }: { profile?: IProfileResponse }) => {
  const { isAtHome } = useGameSessionContext();

  return <StyledArea hideDisplay={!!isAtHome}>{profile ? <PlayHome profile={profile} /> : <Loading />}</StyledArea>;
};
