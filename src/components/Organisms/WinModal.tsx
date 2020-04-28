import * as React from "react";
import { ConfirmButton, DangerButton, WarningButton } from "../Atoms/Button";
import { Modal } from "../Molecules/Modal";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { Prose } from "../Atoms/Prose";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const pluralise = (word: string, value: number): string => {
  let plural = "";
  if (Math.abs(value) !== 1) {
    plural = "s";
  }
  return value + " " + word + plural;
};

const getTimeString = (seconds: number): string => {
  const parts = [];
  let value = seconds;

  const days = Math.floor(value / DAY);
  parts.push(pluralise("day", days));
  value -= days * DAY;

  const hours = Math.floor(value / HOUR);
  parts.push(pluralise("hour", hours));
  value -= hours * HOUR;

  const mins = Math.floor(value / MINUTE);
  parts.push(pluralise("min", mins));
  value -= mins * MINUTE;

  parts.push(pluralise("sec", value));

  return parts.join(", ");
};

export const WinModal = () => {
  const { rankStatus } = useGameSessionContext();
  const [isOpen, setIsOpen] = React.useState(true);

  if (!rankStatus || rankStatus.acknowledgeToken || !rankStatus.winState) {
    return null;
  }

  const { completionTime, isPersonalBest, isWorldRecord, leaderboardPosition } = rankStatus.winState;

  return (
    <Modal isOpen={isOpen} title="Mission Complete">
      <Prose>
        <Text>
          Congratulations. You completed the mission in:
          <br />
          {getTimeString(completionTime)}
        </Text>
      </Prose>
      {(isPersonalBest || isWorldRecord) && (
        <Records>
          {isPersonalBest && <Record>Personal Best</Record>}
          {isWorldRecord && <Record>World Record</Record>}
        </Records>
      )}
      <Buttons as="div">
        <ConfirmButton as="a" href="/players">
          View Leaderboard (#{leaderboardPosition})
        </ConfirmButton>
        <WarningButton onClick={() => setIsOpen(false)}>Continue Playing</WarningButton>
        <DangerButton as="a" href="/reset">
          Start Over
        </DangerButton>
      </Buttons>
    </Modal>
  );
};

const Text = styled.p`
  text-align: center;
`;

const Records = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${GRID.UNIT};
  > * {
    margin: 0 ${GRID.HALF};
  }
`;

const Record = styled.div`
  text-transform: uppercase;
  background: ${COLOURS.GREY.DARKEST};
  padding: ${GRID.HALF} ${GRID.UNIT};
  border-radius: 4px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  > *:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
  }
`;
