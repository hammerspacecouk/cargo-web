import * as React from "react";
import { useEffect } from "react";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import { PlayHome } from "./PlayHome";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../styles/media";

const StyledArea = styled.div`
  display: none;
  ${BREAKPOINTS.XL`
    display: block;
    height: 100%;
    `};
`;

export const LandingPage = () => {
  const { setIsAtHome } = useGameSessionContext();
  useEffect(() => {
    setIsAtHome(true);
    return () => {
      setIsAtHome(false);
    };
  }, []);

  return (
    <StyledArea>
      <PlayHome />
    </StyledArea>
  );
};
