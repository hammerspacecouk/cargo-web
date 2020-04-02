import * as React from "react";
import { useFrameEffect } from "../../hooks/useFrameEffect";
import { DangerButton } from "../Atoms/Button";

interface IProps {
  readonly time: number;
  readonly children: any;
  readonly href: string;
}

const formatTime = (msTime: number) => {
  return Math.ceil(msTime / 1000);
};

export const CountdownLink = React.memo(({ time, children, href }: IProps) => {
  const [timeLeft, setTimeLeft] = React.useState(() => formatTime(time));
  const [disabled, setDisabled] = React.useState(false);

  useFrameEffect((timePassed) => {
    const timeRemaining = Math.max(0, time - timePassed);
    const finished = timeRemaining <= 0;
    setTimeLeft(formatTime(timeRemaining));
    setDisabled(!finished);
    return !finished;
  });

  if (disabled) {
    return (
      <DangerButton disabled={disabled}>
        {children} ({timeLeft})
      </DangerButton>
    );
  }

  return (
    <DangerButton as="a" href={href}>
      {children}
    </DangerButton>
  );
});
