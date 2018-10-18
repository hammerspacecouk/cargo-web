import * as React from "react";

export interface Props {
  readonly percent: number;
  readonly isHealth?: boolean;
}

export default ({ percent, isHealth = false }: Props) => {
  const percentValue = Math.max(percent, 2); // to show that it is a bar that will fill up

  let healthClass = "";
  if (isHealth) {
    healthClass = "progress__bar--ok";
    if (percent < 60) {
      healthClass = "progress__bar--warning";
    }
    if (percent < 20) {
      healthClass = "progress__bar--danger";
    }
  }

  // todo - varying heights via props
  return (
    <div className="progress">
      <div
        className={`progress__bar ${healthClass}`}
        style={{
          width: `${percentValue}%`
        }}
      />
    </div>
  );
};
