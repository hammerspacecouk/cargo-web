import * as React from "react";

interface Props {
  num: number;
  den: number;
}

export const Fraction = ({ num, den }: Props) => (
  <>
    <sup>{num}</sup>&#8260;<sub>{den}</sub>
  </>
);
