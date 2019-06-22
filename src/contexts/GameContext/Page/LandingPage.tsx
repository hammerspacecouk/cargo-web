import * as React from "react";
import { useEffect } from "react";
import { useGameContext } from "../GameContext";
import { PlayHome } from "../../../pages/Play/PlayHome";
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
  const { setIsAtHome } = useGameContext();
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
