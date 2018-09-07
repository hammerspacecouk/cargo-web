import * as React from "react";

export interface Props {
  percent: number;
}

export default (props: Props) => {
  const percent = Math.max(props.percent, 2); // to show that it is a bar that will fill up

  // todo - varying heights via props
  return (
    <div className="progress">
      <div
        className="progress__bar"
        style={{
          width: `${percent}%`
        }}
      />
    </div>
  );
};
