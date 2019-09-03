import * as React from "react";
import styled, { keyframes } from "styled-components";
import { Environment } from "../../utils/environment";

const rotatingPlanet = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const StyledPlanet = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2000px;
  box-shadow: 0 -10px 130px #7894a9;
  overflow: hidden;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    box-shadow: 0 -140px 200px black inset, 0 0px 130px 40px #8cbaff inset, 0 0px 23px 4px #8cbaff inset;
  }
`;

// todo - figure out a performant animation strategy
const PlanetInner = styled.div`
  background: url("${Environment.assetPrefix}/planet.1.jpg") repeat top left;
  width: 100%;
  height: 2400px;
  //animation:  ${rotatingPlanet} 2000s infinite linear;
`;

// todo - props that change the design for each planet
export const Planet = () => (
  <StyledPlanet>
    <PlanetInner />
  </StyledPlanet>
);
