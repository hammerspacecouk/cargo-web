import * as React from "react";
import { Badge } from "../Badge/Badge";

interface IProps {
  value: number;
}

export const NumberBadge = ({ value }: IProps) => {
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

  return <Badge animate={animate}>{value}</Badge>;
};
