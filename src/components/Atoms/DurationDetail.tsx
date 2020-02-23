import React from "react";

const SECONDS_IN_DAY: number = 60 * 60 * 24;
const SECONDS_IN_HOUR: number = 60 * 60;
const SECONDS_IN_MINUTE: number = 60;

const secondsToFormat = (seconds: number): string => {
  let remainingSeconds = seconds;

  const days = Math.floor(remainingSeconds / SECONDS_IN_DAY);
  remainingSeconds = remainingSeconds - days * SECONDS_IN_DAY;

  const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
  remainingSeconds = remainingSeconds - hours * SECONDS_IN_HOUR;

  const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
  remainingSeconds = remainingSeconds - minutes * SECONDS_IN_MINUTE;

  return [
    word("day", days),
    word("hour", hours),
    word("min", minutes),
    word("sec", remainingSeconds),
  ].filter(i => i).join(", ");
};

const word = (word: string, num: number): string => {
  // rough pluralisation
  if (num === 0) {
    return null;
  }
  if (num === 1) {
    return `${num} ${word}`;
  }
  return `${num} ${word}s`;
};

export const DurationDetail = ({seconds}: {seconds: number}) => {
  return <span>{secondsToFormat(seconds)}</span>
};
