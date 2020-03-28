import * as React from "react";
import { ReactElement } from "react";
import { IntervalFormat } from "./IntervalFormat";
import { AnimatedEllipsis } from "./AnimatedEllipsis";

const getStatus = (remaining: number, travelled?: number): ReactElement => {
  if (travelled === undefined) {
    return null;
  }

  if (remaining + travelled < 70) {
    // short trip, fewer events
    if (travelled < 3) {
      return (
        <span>
          Starting engines
          <AnimatedEllipsis />
        </span>
      );
    }
    if (remaining < 3) {
      return (
        <span>
          Decelerating
          <AnimatedEllipsis />
        </span>
      );
    }
    if (travelled < 6) {
      return (
        <span>
          Accelerating
          <AnimatedEllipsis />
        </span>
      );
    }
    return null;
  }

  if (remaining < 3) {
    return (
      <span>
        Finalising pay
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 6) {
    return (
      <span>
        Checking speeding fines
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 9) {
    return (
      <span>
        Decontaminating cargo bay
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 12) {
    return (
      <span>
        Permission to orbit granted
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 15) {
    return (
      <span>
        Completing paperwork
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 18) {
    return (
      <span>
        Communicating with customs
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 21) {
    return (
      <span>
        Awaiting clearance
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 24) {
    return (
      <span>
        Requesting permission to enter orbit
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 27) {
    return (
      <span>
        Decelerating
        <AnimatedEllipsis />
      </span>
    );
  }
  if (remaining < 30) {
    return (
      <span>
        Approaching destination star system
        <AnimatedEllipsis />
      </span>
    );
  }

  if (travelled < 3) {
    return (
      <span>
        Registering cargo
        <AnimatedEllipsis />
      </span>
    );
  }
  if (travelled < 6) {
    return (
      <span>
        Requesting permission for departure
        <AnimatedEllipsis />
      </span>
    );
  }
  if (travelled < 9) {
    return (
      <span>
        Completing paperwork
        <AnimatedEllipsis />
      </span>
    );
  }
  if (travelled < 12) {
    return (
      <span>
        Permission granted
        <AnimatedEllipsis />
      </span>
    );
  }
  if (travelled < 15) {
    return (
      <span>
        Starting engines
        <AnimatedEllipsis />
      </span>
    );
  }
  if (travelled < 18) {
    return (
      <span>
        Leaving orbit
        <AnimatedEllipsis />
      </span>
    );
  }
  if (travelled < 21) {
    return (
      <span>
        Accelerating
        <AnimatedEllipsis />
      </span>
    );
  }
  if (travelled < 24) {
    return (
      <span>
        Leaving star system
        <AnimatedEllipsis />
      </span>
    );
  }
  if (travelled < 27) {
    return (
      <span>
        Entering the void
        <AnimatedEllipsis />
      </span>
    );
  }

  return null;
};

export const TravelCountdown = React.memo(({ seconds, travelled }: IProps) => {
  if (seconds > 0) {
    return getStatus(seconds, travelled) || <IntervalFormat seconds={seconds} />;
  }

  return (
    <span>
      Establishing Orbit
      <AnimatedEllipsis />
    </span>
  );
});

interface IProps {
  seconds: number;
  travelled?: number;
}
