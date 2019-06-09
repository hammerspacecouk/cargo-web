import * as React from "react";
import styled from "styled-components";

interface IProps {
  num: number;
  den: number;
}

const StyledSup = styled.sup`
  position: relative;
  top: -4px;
  left: 1px;
`;

const StyledSub = styled.sup`
  position: relative;
  top: 4px;
  left: -1px;
`;

export const Fraction = ({ num, den }: IProps) => (
  <>
    <StyledSup>{num}</StyledSup>&#8260;<StyledSub>{den}</StyledSub>
  </>
);
