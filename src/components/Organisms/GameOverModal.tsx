import { Modal } from "@src/components/Molecules/Modal";
import * as React from "react";
import { H3 } from "@src/components/Atoms/Heading";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { PANEL_INNER_DIVIDER_BORDER } from "@src/styles/colours";
import { TextCenter, TextDanger } from "@src/components/Atoms/Text";
import { ActionButton } from "@src/components/Atoms/Button";
import { routes } from "@src/routes";

export const GameOverModal = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Modal isOpen={isOpen} title="Game Over!" onClose={() => setIsOpen(false)}>
      <TextCenter>
        <TextDanger>Your Reticulum Shuttle was destroyed.</TextDanger>
      </TextCenter>
      <Option>
        <OptionTitle>Reset game</OptionTitle>
        <OptionText>This will remove all progress and start again from the beginning.</OptionText>
        <OptionButton>
          <ActionButton as="a" href={routes.getResetAccount()}>
            Reset Game
          </ActionButton>
        </OptionButton>
      </Option>
      <Option>
        <OptionTitle>Continue</OptionTitle>
        <OptionText>Purchase a new Reticulum Shuttle. This will continue with all progress intact.</OptionText>
        <OptionButton>
          <ActionButton disabled>$2 (Coming soon)</ActionButton>
        </OptionButton>
      </Option>
    </Modal>
  );
};

const Option = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${GRID.UNIT};
  :last-child {
    padding-top: ${GRID.UNIT};
    border-top: ${PANEL_INNER_DIVIDER_BORDER};
  }
`;
const OptionTitle = styled(H3)`
  width: 100%;
  margin-bottom: ${GRID.HALF};
`;

const OptionText = styled.div`
  flex: 1;
`;
const OptionButton = styled.div`
  margin-left: ${GRID.UNIT};
`;
