import * as React from "react";
import styled, { keyframes } from "styled-components";
import { colours } from "../../../GlobalStyle";

interface PropsInterface {
  percent?: number;
  className?: string;
}

const radial = keyframes`
  from {
    opacity:1;
    stroke-dasharray:0, 300
  }
  to {
    opacity: 1;
  }
`;

const StyledShieldStrength = styled.div`
    width: 100%;
    line-height: 0;
    height: 0;
    overflow: hidden;
    padding-top: 100%;
    position: relative;
`;

const StyledSvg = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
`;

const CircleTrack = styled.circle`
    fill: none;
    stroke: rgba(255, 255, 255, 0.2);
`;

const CircleBar = styled(CircleTrack)<{colour: string}>`
    opacity: 0;
    stroke: ${props => props.colour};
    animation-delay: 1.5s;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-name: ${radial};
    stroke-linecap: round;
`;

/**
 * Standard way to display a score value (with Icon)
 */
export default React.memo(function({ percent, className }: PropsInterface) {
  const size = 100;
  const barWidth = 12;
  const trackLength = 300;
  const barLength = (percent / 100) * trackLength;
  const dash = `${barLength} ${trackLength}`;

  const centre = size / 2;
  const radius = centre - barWidth;

  let colour = colours.blue[7];
  if (percent <= 75) {
    colour = colours.yellow[7];
  }
  if (percent <= 50) {
    colour = colours.orange[7];
  }
  if (percent <= 25) {
    colour = colours.red[7];
  }

  let bar = null;
  if (percent !== undefined) {
    bar = (
      <CircleBar
        cx={centre}
        cy={centre}
        r={radius}
        strokeWidth={barWidth}
        strokeDasharray={dash}
        colour={colour}
      />
    );
  }

  return (
    <StyledShieldStrength
      title={`${percent}%`}
      className={className}
    >
      <StyledSvg
        viewBox={`0 0 ${size} ${size}`}
      >
        <CircleTrack
          cx={centre}
          cy={centre}
          r={radius}
          strokeWidth={barWidth}
        />
        {bar}
      </StyledSvg>
    </StyledShieldStrength>
  );
});
