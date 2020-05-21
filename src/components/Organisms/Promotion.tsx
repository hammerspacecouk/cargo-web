import * as React from "react";
import styled, { css } from "styled-components";
import { IRankStatus } from "@src/interfaces";
import { ProgressBar } from "@src/components/Atoms/ProgressBar";
import { GRID } from "@src/styles/variables";
import { useMounted } from "@src/hooks/useMounted";
import { P } from "@src/components/Atoms/Text";
import { COLOURS } from "@src/styles/colours";
import { BREAKPOINTS } from "@src/styles/media";

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
      if (progress !== 1) {
        setProgress(1);
      }
    }
    // phase 2
    if (diff >= ANIMATE_PHASE2) {
      if (progress !== 0.02) {
        setProgress(0.02);
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
        {olderRanks.slice(0, 3).map((rank) => (
          <InactiveRank key={rank.title}>{rank.title}</InactiveRank>
        ))}
      </RankBox>
      {rankStatus.description && <StyledDescription>{rankStatus.description}</StyledDescription>}
    </StyledPromotion>
  );
};

interface IProps {
  rankStatus?: IRankStatus;
}

const StyledPromotion = styled.div`
  max-width: 480px;
`;

const StyledDescription = styled(P)`
  border-top: ${COLOURS.PANEL_INNER_DIVIDER} solid 1px;
  padding-top: ${GRID.UNIT};
  margin-bottom: ${GRID.UNIT};
  text-align: center;
`;

const RankBox = styled.div`
  margin: ${GRID.UNIT} 0;
  text-align: center;
`;

const RankItem = styled.div`
  margin-bottom: ${GRID.HALF};
  line-height: 1.1;
`;

const INACTIVE_OPACITY = "0.4";
const INACTIVE_SIZE = "1.2rem";
const INACTIVE_SIZE_LARGE = "1.4rem";

const InactiveRank = styled(RankItem)`
  opacity: ${INACTIVE_OPACITY};
  font-size: ${INACTIVE_SIZE};
  ${BREAKPOINTS.L`
    font-size: ${INACTIVE_SIZE_LARGE};
  `};
`;

const ActiveRank = styled(RankItem)<{ isOn: boolean }>`
  transition: all 0.8s ease-in;
  will-change: font-size, opacity;
  opacity: ${(props) => (props.isOn ? "1" : INACTIVE_OPACITY)};
  ${(props) =>
    props.isOn
      ? css`
          font-size: 1.8rem;
          ${BREAKPOINTS.L`font-size: 2.2rem;`}
        `
      : css`
          font-size: ${INACTIVE_SIZE};
          ${BREAKPOINTS.L`font-size: ${INACTIVE_SIZE_LARGE}`}
        `}
`;

const ANIMATE_START = 500;
const ANIMATE_END = 3000;
const ANIMATE_PHASE2 = 2500;
