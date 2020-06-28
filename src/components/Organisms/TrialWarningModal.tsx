import * as React from "react";
import { ConfirmButton } from "@src/components/Atoms/Button";
import { Modal } from "@src/components/Molecules/Modal";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import styled from "styled-components";
import { Prose } from "@src/components/Atoms/Prose";
import { routes } from "@src/routes";

export const TrialWarningModal = () => {
  const { showTrialWarning } = useGameSessionContext();
  const [isOpen, setIsOpen] = React.useState(true);

  if (!showTrialWarning) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="Approaching Trial End" onClose={() => setIsOpen(false)}>
      <Prose>
        <Text>
          You are approaching the end of the trial period. To continue playing beyond the trial, upgrade to the full
          game.
        </Text>
      </Prose>
      <Buttons as="div">
        <ConfirmButton as="a" href={routes.getPurchaseUpgrade()}>
          Upgrade
        </ConfirmButton>
      </Buttons>
    </Modal>
  );
};

const Text = styled.p`
  text-align: center;
`;

const Buttons = styled.div`
  text-align: center;
`;
