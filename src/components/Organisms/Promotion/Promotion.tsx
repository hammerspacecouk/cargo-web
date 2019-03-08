import * as React from "react";
import styled from "styled-components";
import { IRankStatus } from "../../../Interfaces";
import { ProgressBar } from "../../Atoms/ProgressBar/ProgressBar";
import { GRID } from "../../../styles/variables";
import { useMounted } from "../../../hooks/useMounted";
import { SIZES } from "../../../styles/typography";

interface IProps {
  rankStatus?: IRankStatus;
}

const StyledPromotion = styled.div`
  width: 94vw;
  max-width: 480px;
`;

const RankBox = styled.div`
  margin: ${GRID.UNIT} 0;
  text-align: center;
`;

const RankItem = styled.div`
  margin-bottom: ${GRID.HALF};
`;

const INACTIVE_OPACITY = "0.4";
const INACTIVE_SIZE = "1.4rem";

const InactiveRank = styled(RankItem)`
  opacity: ${INACTIVE_OPACITY};
  font-size: ${INACTIVE_SIZE};
`;

const ActiveRank = styled(RankItem)<{ isOn: boolean }>`
  transition: all 0.8s ease-in;
  opacity: ${props => (props.isOn ? "1" : INACTIVE_OPACITY)};
  font-size: ${props => (props.isOn ? "2.2rem" : INACTIVE_SIZE)};
`;

const ANIMATE_START = 500;
const ANIMATE_END = 3000;
const ANIMATE_PHASE2 = 2500;

export const Promotion = ({ rankStatus }: IProps) => {
  const [progress, setProgress] = React.useState(80);
  const [phase2, setPhase2] = React.useState(false);
  const startTime = React.useRef(null);
  const isMounted = useMounted();
  let frame: number = null;

  const animate = (stamp: number) => {
    if (!isMounted()) {
      return;
    }

    if (!startTime.current) {
      startTime.current = stamp;
    }

    const diff = stamp - startTime.current;

    if (diff < ANIMATE_START) {
      return (frame = window.requestAnimationFrame(animate)); // come back later
    }

    if (diff > ANIMATE_END) {
      return; // finished, nothing to do
    }

    // phase 1
    if (diff < ANIMATE_PHASE2) {
      if (progress !== 100) {
        setProgress(100);
      }
    }
    // phase 2
    if (diff >= ANIMATE_PHASE2) {
      if (progress !== 2) {
        setProgress(2);
      }
      if (!phase2) {
        setPhase2(true);
      }
    }
    frame = window.requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    frame = window.requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [rankStatus]);

  if (!rankStatus) {
    return null;
  }

  const nextRank = rankStatus.nextRank && rankStatus.nextRank.title;
  const newRank = rankStatus.currentRank.title;
  const previousRank = rankStatus.previousRank.title;
  const olderRanks = rankStatus.olderRanks;

  return (
    <StyledPromotion>
      <ProgressBar percent={progress} />
      <RankBox>
        {nextRank && <InactiveRank>{nextRank}</InactiveRank>}
        <ActiveRank isOn={phase2}>{newRank}</ActiveRank>
        <ActiveRank isOn={!phase2}>{previousRank}</ActiveRank>
        {olderRanks.map(rank => (
          <InactiveRank key={rank.title}>{rank.title}</InactiveRank>
        ))}
      </RankBox>
    </StyledPromotion>
  );
};
