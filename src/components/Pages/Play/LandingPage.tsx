import * as React from "react";
import { PlayHome } from "./PlayHome";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../styles/media";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";

const StyledArea = styled.div<{ hideDisplay: boolean }>`
  display: ${({ hideDisplay }) => (hideDisplay ? "none" : "block")};
  ${BREAKPOINTS.XL`
    display: block;
    height: 100%;
  `};
`;

export const LandingPage = () => {
  const { isAtHome } = useGameSessionContext();

  return (
    <StyledArea hideDisplay={!!isAtHome}>
      <PlayHome />
    </StyledArea>
  );
};
