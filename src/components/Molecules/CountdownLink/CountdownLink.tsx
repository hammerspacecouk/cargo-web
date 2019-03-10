import * as React from "react";
import { useFrameEffect } from "../../../hooks/useFrameEffect";
import { DangerButton } from "../../Atoms/Button/Button";

interface IProps {
  readonly time: number;
  readonly children: any;
  readonly href: string;
}

const formatTime = (msTime: number) => {
  return Math.ceil(msTime / 1000);
};

// todo - abstract this so it doesn't always have to be a <DangerButton>
export const CountdownLink = ({ time, children, href }: IProps) => {
  const [timeLeft, setTimeLeft] = React.useState(() => formatTime(time));
  const [disabled, setDisabled] = React.useState(false);

  useFrameEffect(timePassed => {
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
};