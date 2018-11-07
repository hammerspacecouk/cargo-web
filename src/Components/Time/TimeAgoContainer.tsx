import * as React from "react";
import { useFrameEffect } from "../../hooks/useFrameEffect";

interface Props {
  datetime: Date;
}

const getValue = (datetime: Date, now: Date): string => {
  const seconds = Math.floor((now.getTime() - datetime.getTime()) / 1000);

  if (seconds > 60 * 60 * 24 * 28) {
    return datetime.toLocaleString();
  }
  let interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (Math.floor(seconds) <= 1) {
    return "Just now";
  }
  return Math.floor(seconds) + " seconds ago";
};

export default ({datetime}: Props) => {
  const [text, setText] = React.useState(getValue(datetime, new Date()));

  useFrameEffect(() => {
    setText(getValue(datetime, new Date()));
    return true;
  }, [datetime]);

  return (
    <time
      dateTime={datetime.toISOString()}
      title={datetime.toISOString()}
    >
      {text}
    </time>
  );
};
