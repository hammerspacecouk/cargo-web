import * as React from "react";

interface Props {
  datetime: Date;
}

const getSeconds = (datetime: Date): number => {
  const now = new Date();
  return Math.floor((now.getTime() - datetime.getTime()) / 1000);
};

const getValue = (seconds: number, datetime: Date): string => {

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

/**
 * Show dynamically updating time since an event
 */
export default function TimeAgo({datetime}: Props) {
  const [text, setText] = React.useState(
    getValue(getSeconds(datetime), datetime)
  );

  let frameHandler: number = null;
  let timeout: number = null;

  const loop = () => {
    const newSeconds = getSeconds(datetime);
    setText(getValue(newSeconds, datetime));

    if (newSeconds < 120) {
      frameHandler = window.requestAnimationFrame(loop);
      return;
    }
    if (newSeconds < (60 * 300)) {
      timeout = window.setTimeout(loop, (30 * 1000));
      return;
    }
    timeout = window.setTimeout(loop, (30 * 60 * 1000));
  };

  React.useEffect(() => {
    loop();
    return () => {
      if (frameHandler) {
        window.cancelAnimationFrame(frameHandler);
      }
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
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
