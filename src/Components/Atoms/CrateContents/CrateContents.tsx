import * as React from "react";
import styled from "styled-components";
import { ChildrenPropsInterface } from "../../../interfaces/PropsInterface";
import { Crate } from "../../Icons/Crate/Crate";

const StyledCrateContents = styled.div`
    position: relative;
    width: 60px;
    perspective: 2000px;
`;

const StyledCrate = styled.div`
    display: inline-block;
    line-height: 0;
    width: 60px;
    height: 40px;
`;

const StyledContent = styled.div`
    position: absolute;
    top: 2px;
    left: 0;
    right: 20px;
    line-height: 40px;
    text-align: center;
    font-size: 1.2rem;
    transform: rotateY(-42deg);
`;

export const CrateContents = ({children}: ChildrenPropsInterface) => (
  <StyledCrateContents>
    <StyledCrate>
      <Crate />
    </StyledCrate>
    <StyledContent>
      {children}
    </StyledContent>
  </StyledCrateContents>
);
