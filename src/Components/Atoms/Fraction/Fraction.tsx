import * as React from "react";

interface IProps {
  num: number;
  den: number;
}

export const Fraction = ({ num, den }: IProps) => (
  <>
    <sup>{num}</sup>&#8260;<sub>{den}</sub>
  </>
);
