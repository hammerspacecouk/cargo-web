import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../../hooks/useLocale";
import { useMounted } from "../../hooks/useMounted";
import { differenceInSeconds } from "date-fns";

/**
 * Show dynamically updating time since an event
 */
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const TimeAgo = ({ className, datetime }: IProps) => {
  const [relativeSeconds, setRelativeSeconds] = useState(() => differenceInSeconds(datetime, new Date()));
  const timer: { current?: number } = useRef(null);
  const isMounted = useMounted();

  useEffect(() => {
    let seconds = differenceInSeconds(datetime, new Date());

    // decide when to update
    const secondsToDecideUpdate = Math.abs(seconds);

    // no timers after a day
    if (secondsToDecideUpdate > DAY) {
      // round to a day so we don't end up in any re-render loops
      setRelativeSeconds(Math.ceil(seconds / DAY) * DAY);
      return;
    }

    let secondsUntilUpdate = 1;
    if (secondsToDecideUpdate > MINUTE) {
      // at the next minute boundary
      secondsUntilUpdate = MINUTE - (secondsToDecideUpdate % MINUTE);
    }
    if (secondsToDecideUpdate > HOUR) {
      // at the next hour boundary
      secondsUntilUpdate = HOUR - (secondsToDecideUpdate % HOUR);
    }

    timer.current = window.setTimeout(() => {
      if (isMounted()) {
        timer.current = null;
        const seconds = differenceInSeconds(datetime, new Date());
        setRelativeSeconds(seconds);
      }
    }, secondsUntilUpdate * 1000);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [datetime, relativeSeconds]);

  return (
    <time className={className} dateTime={datetime.toISOString()} title={datetime.toISOString()}>
      <TimeString relativeSeconds={relativeSeconds} />
    </time>
  );
};

interface IProps {
  className?: string;
  datetime: Date;
}

const TimeString = React.memo(({ relativeSeconds }: { relativeSeconds: number }) => {
  const locale = useLocale();
  let value = relativeSeconds;
  let type = "second";

  if (-relativeSeconds > DAY) {
    value = Math.ceil(relativeSeconds / DAY);
    type = "day";
  } else if (-relativeSeconds > HOUR) {
    value = Math.ceil(relativeSeconds / HOUR);
    type = "hour";
  } else if (-relativeSeconds > MINUTE) {
    value = Math.ceil(relativeSeconds / MINUTE);
    type = "minute";
  }

  return getString(value, type, locale);
});

const getString = (value: number, type: string, locale: any) => {
  if (Intl && (Intl as any).RelativeTimeFormat) {
    return new (Intl as any).RelativeTimeFormat(locale, { numeric: "auto" }).format(value, type);
  }
  // rudimentary english fallback
  if (value >= 0 && type === "second") {
    return "now";
  }
  let plural = "";
  if (Math.abs(value) !== 1) {
    plural = "s";
  }
  return `${Math.abs(value)} ${type}${plural} ago`;
};
