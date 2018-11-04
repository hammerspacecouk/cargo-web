import * as React from "react";
import { useFrameEffect } from "../../hooks/useFrameEffect";

interface Props {
  readonly time: number;
  readonly children: any;
  readonly href: string;
  readonly className: string;
}

const formatTime = (msTime: number) => {
  return Math.ceil(msTime / 1000);
};

export default ({ time, children, href, className }: Props) => {
  const [timeLeft, setTimeLeft] = useState(formatTime(time));
  const [disabled, setDisabled] = useState(false);

  useFrameEffect((timePassed) => {
    const timeRemaining = Math.max(0, time - timePassed);
    const finished = timeRemaining <= 0;
    setTimeLeft(formatTime(timeRemaining));
    setDisabled(!finished);
    return !finished;
  });

  if (disabled) {
    return (
      <button className={className} disabled={disabled}>
        {children} ({timeLeft})
      </button>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};
