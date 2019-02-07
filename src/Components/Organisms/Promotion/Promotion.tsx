import * as React from "react";
import styled from "styled-components";
import { IRankStatus } from "../../../Interfaces";
import { ProgressBar } from "../../Atoms/ProgressBar/ProgressBar";

interface IProps {
  rankStatus?: IRankStatus;
}

/*
 todo - style this how I want it

 .o-promotion {
  margin-bottom: $grid-unit;
  width: calc(100vw - #{$grid-unit * 5});
  @media (min-width: 26em) {
    width: auto;
    min-width: 22em;
  }

  &__rank-box {
    @extend .b;
    padding: $grid-unit 0;
    text-align: center;
    overflow: hidden;
  }

  &__progress {
    padding: $grid-unit 0;
    margin-bottom: $grid-unit;
  }

  &__previous {
    will-change: transform, opacity;
    &--go {
      animation: 1.5s zoom-away linear forwards;
    }
  }

  &__current {
    will-change: transform;
    transform: scale(0);
    animation: 1s zoom-in cubic-bezier(0.13, 0.76, 0.82, 1.9) forwards;
  }

  @keyframes zoom-away {
    0%, 20% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(3);
      opacity: 0;
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }
}
 */

const StyledPromotion = styled.div``;
const RankBox = styled.div``;
const PromotionProgress = styled.div``;

export const Promotion = ({ rankStatus }: IProps) => {
  let allowAnimationUpdate: boolean = false;
  let startTime: number = null;

  const [displayState, setDisplayState] = React.useState({
    nextActive: false,
    previousActive: true,
    previousClass: "",
    progress: 80,
  });

  const animate = (stamp: number) => {
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
      nextActive: diff >= 2500,
      previousActive: diff < 2500,
      previousClass: diff > 1000 ? "o-promotion__previous--go" : "",
      progress,
    });
    window.requestAnimationFrame(animate);
  };

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
    // todo - {`o-promotion__previous ${displayState.previousClass}`}
    previous = <div>{rankStatus.previousRank.title}</div>;
  }

  if (displayState.nextActive) {
    // todo - {`o-promotion__current `}
    next = <div>{rankStatus.currentRank.title}</div>;
  }

  return (
    <StyledPromotion>
      <RankBox>
        {previous}
        {next}
      </RankBox>

      <PromotionProgress>
        <ProgressBar percent={displayState.progress} />
      </PromotionProgress>

      <p>Share this:</p>
      {/* todo - links to this users public page */}
      <p>Facebook</p>
      <p>Twitter</p>
    </StyledPromotion>
  );
};
