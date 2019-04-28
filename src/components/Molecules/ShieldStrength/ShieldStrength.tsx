import * as React from "react";
import styled, { keyframes } from "styled-components";
import { IPlayer } from "../../../Interfaces";
import { COLOURS } from "../../../styles/colours";
import { animate } from "../../Atoms/Placeholder/PlaceHolder";
import { PlayerFlag } from "../PlayerFlag/PlayerFlag";

interface IProps {
  percent?: number;
  className?: string;
  player?: IPlayer;
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

const StyledShieldStrength = styled.span<{ loading: boolean }>`
  display: inline-block;
  width: 100%;
  line-height: 0;
  height: 0;
  overflow: hidden;
  padding-top: 100%;
  position: relative;
  ${props => (props.loading ? animate : ``)}
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const StyledFlag = styled(PlayerFlag)`
  padding: 8px;
`;

const StyledSvg = styled.svg`
  transform: rotate(-90deg);
`;

const CircleTrack = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
`;

const CircleBar = styled(CircleTrack)<{ colour: string }>`
  opacity: 0;
  stroke: ${props => props.colour};
  animation-delay: 1s;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-name: ${radial};
  stroke-linecap: round;
`;

/**
 * Standard way to display a score value (with Icon)
 */
export const ShieldStrength = React.memo(
  ({ percent, className, player }: IProps) => {
    const size = 100;
    const barWidth = 12;

    const centre = size / 2;
    const radius = centre - barWidth / 2;
    const trackLength = 2 * Math.PI * radius;

    let bar = null;
    if (percent !== undefined) {
      const barLength = (percent / 100) * trackLength;
      const dash = `${barLength} ${trackLength}`;
      let colour = COLOURS.HEALTH.FULL;
      if (percent < 100) {
        colour = COLOURS.HEALTH.GOOD;
      }
      if (percent <= 75) {
        colour = COLOURS.HEALTH.OK;
      }
      if (percent <= 50) {
        colour = COLOURS.HEALTH.WARNING;
      }
      if (percent <= 25) {
        colour = COLOURS.HEALTH.DANGER;
      }

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

    let emblem;
    if (player) {
      emblem = <StyledFlag player={player} />;
    }

    return (
      <StyledShieldStrength
        title={`${percent}%`}
        className={className}
        loading={percent === undefined}
      >
        {emblem}
        <StyledSvg viewBox={`0 0 ${size} ${size}`}>
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
  }
);
