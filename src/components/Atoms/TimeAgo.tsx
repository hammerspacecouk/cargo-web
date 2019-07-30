import * as React from "react";

/**
 * Show dynamically updating time since an event
 * todo - use FormattedRelativeTime once no longer in beta
 */
export const TimeAgo = ({ className, datetime }: IProps) => {
  const diffInSeconds: number = getSeconds(datetime);
  return (
    <time className={className} dateTime={datetime.toISOString()} title={datetime.toISOString()}>
      {getString(diffInSeconds)}
      {/*<FormattedRelativeTime*/}
      {/*  value={diffInSeconds}*/}
      {/*  numeric="always"*/}
      {/*  unit="second"*/}
      {/*  style="long"*/}
      {/*  updateIntervalInSeconds={10}*/}
      {/*  format=""*/}
      {/*  localeMatcher="best fit"*/}
      {/*/>*/}
    </time>
  );
};

interface IProps {
  className?: string;
  datetime: Date;
}

const getSeconds = (datetime: Date): number => {
  const now = new Date();
  return Math.floor((datetime.getTime() - now.getTime()) / 1000);
};

const getString = (seconds: number): string => {
  if (Intl && (Intl as any).RelativeTimeFormat) {
    const formatter = new (Intl as any).RelativeTimeFormat('en', { style: 'long' });
    return formatter.format(seconds, 'second');
  }
  return `${Math.abs(seconds)} seconds ago`;
};
