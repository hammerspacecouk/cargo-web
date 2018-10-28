import * as React from "react";
import { useState } from "react";
import RankStatusInterface from "../../interfaces/RankStatusInterface";
import ProgressBar from "../../components/Element/ProgressBar";

interface Props {
  rankStatus?: RankStatusInterface;
}

export default function PromotionContainer({ rankStatus }: Props) {
  let allowAnimationUpdate: boolean = false;
  let startTime: number = null;

  const [displayState, setDisplayState] = useState({
    previousClass: "",
    previousActive: true,
    nextActive: false,
    progress: 80
  });

  function animate(stamp: number) {
    if (!allowAnimationUpdate) {
      return;
    }

    if (!startTime) {
      startTime = stamp;
    }

    const diff = stamp - startTime;

    let progress = displayState.progress;
    // todo - numbers as constants
    if (diff > 500 && diff < 2500) {
      progress = 100;
    } else if (diff >= 2500) {
      progress = 2;
    }

    // todo - *ping* on new rank

    setDisplayState({
      previousClass: diff > 1000 ? "o-promotion__previous--go" : "",
      previousActive: diff < 2500,
      nextActive: diff >= 2500,
      progress
    });
    window.requestAnimationFrame(animate);
  }

  React.useEffect(() => {
    allowAnimationUpdate = true;
    window.requestAnimationFrame(animate);
    return () => {
      allowAnimationUpdate = false;
      startTime = null;
    };
  }, [rankStatus]);


  if (!rankStatus) {
    return null;
  }

  let previous = null;
  let next = null;

  if (displayState.previousActive) {
    previous = (
      <div className={`o-promotion__previous ${displayState.previousClass}`}>
        {rankStatus.previousRank.title}
      </div>
    );
  }

  if (displayState.nextActive) {
    previous = (
      <div className="o-promotion__current">
        {rankStatus.currentRank.title}
      </div>
    );
  }

  return (
    <div className="o-promotion">
      <div className="o-promotion__rank-box">
        {previous}
        {next}
      </div>

      <div className="o-promotion__progress">
        <ProgressBar percent={displayState.progress}/>
      </div>

      <p>Share this:</p>
      {/* todo - links to this users public page */}
      <p>Facebook</p>
      <p>Twitter</p>
    </div>
  );
}
