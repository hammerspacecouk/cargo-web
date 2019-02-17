import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { COLOURS } from "../../../styles/colours";

interface IProps {
  value: number;
}

const frames = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 1px 1px 8px black;
    }
    50% {
        transform: scale(1.25);
        box-shadow: 1px 1px 24px black;
    }
    100% {
        transform: scale(1);
        box-shadow: 1px 1px 8px black;
    }
`;

const StyledBadge = styled.span<{ animate: boolean }>`
    display: inline-block;
    background: ${COLOURS.BASE};
    color: ${COLOURS.WHITE.STANDARD};
    border-radius: 50px;
    line-height: 24px;
    padding: 0 4px;
    min-width: 26px;
    text-align: center;
    border: solid 1px ${COLOURS.WHITE.STANDARD};
    box-shadow: 1px 1px 8px black;
    ${({ animate }) => animate ? css`animation: ${frames} .6s ease-out 1;` : ""}
`;

export const NumberBadge = ({ value }: IProps) => {
  const [animate, setAnimate] = React.useState(true);

  let resetTimer: number;

  React.useEffect(() => {
    setAnimate(true);
    resetTimer = setTimeout(() => {
      setAnimate(false);
    }, 1000);
    return () => {
      clearTimeout(resetTimer);
    };
  }, [value]);

  return (
    <StyledBadge animate={animate}>{value}</StyledBadge>
  );
};
