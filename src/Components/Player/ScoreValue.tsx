import * as React from "react";
import CreditsIcon from "../Icons/CreditsIcon";

interface PropsInterface {
  score: string; // not an integer
  effectClass?: string;
}

export default ({ score, effectClass }: PropsInterface) => (
  <div className={`score ${effectClass}`}>
    <span className="score__icon">
      <CreditsIcon />
    </span>
    <span className="score__digits">
      {score.split("").map((digit, i) => {
        return (
          <span className="score__digit" key={i}>
            {digit}
          </span>
        );
      })}
    </span>
  </div>
);
