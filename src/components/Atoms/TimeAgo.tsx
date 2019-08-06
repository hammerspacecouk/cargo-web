import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import { FormattedRelativeTime } from "react-intl";
import { useDate } from "../../hooks/useDate";

/**
 * Show dynamically updating time since an event
 */
export const TimeAgo = React.memo(({ className, datetime }: IProps) => {
  const [relativeSeconds, setRelativeSeconds] = useState(undefined);

  useEffect(() => {
    // only do relative time on the client, hence useEffect
    setRelativeSeconds(getSeconds(datetime));
  }, [datetime]);

  let relativeTime: ReactNode = useDate(datetime);
  if (relativeSeconds) {
    relativeTime = (
      <FormattedRelativeTime
        value={relativeSeconds}
        numeric="always"
        unit="second"
        style="long"
        updateIntervalInSeconds={10}
        format=""
        localeMatcher="best fit"
      />
    );
  }

  return (
    <time className={className} dateTime={datetime.toISOString()} title={datetime.toISOString()}>
      {relativeTime}
    </time>
  );
});

interface IProps {
  className?: string;
  datetime: Date;
}

const getSeconds = (datetime: Date): number => {
  const now = new Date();
  return Math.floor((datetime.getTime() - now.getTime()) / 1000);
};
