import * as React from "react";
import styled from "styled-components";
import { IChildrenProps, IClassNameProps } from "../../interfaces";

const Wrap = styled.div`
  display: block;
  height: 0;
  position: relative;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SquareWrap = styled(Wrap)`
  padding-top: 100%;
`;

export const Square = ({ children, className }: IChildrenProps & IClassNameProps) => {
  return (
    <SquareWrap className={className}>
      <Inner>{children}</Inner>
    </SquareWrap>
  );
};
