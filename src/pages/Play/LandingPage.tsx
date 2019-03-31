import * as React from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../styles/media";

const StyledArea = styled.div`
  display: none;
  ${BREAKPOINTS.XL`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    `};
`;

export const LandingPage = () => (
  <StyledArea>
    Choose a ship
  </StyledArea>
);
