import * as React from "react";
import { Badge } from "./Badge";

interface IProps {
  className?: string;
  value: number;
}

export const NumberBadge = ({ className, value }: IProps) => {
  const [animate, setAnimate] = React.useState(true);

  let resetTimer: any; // can't find the right type

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
    <Badge className={className} animate={animate}>
      {value}
    </Badge>
  );
};
