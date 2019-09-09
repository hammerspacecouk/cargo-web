import * as React from "react";
import { Modal } from "../../Molecules/Modal";
import { ConfirmButton } from "../../Atoms/Button";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";
import { useState } from "react";
import { SanctuaryIcon } from "../../Icons/SanctuaryIcon";
import { InlineIcon, TINY_ICON } from "../../Atoms/Icon";
import { Prose } from "../../Atoms/Prose";
import { H3 } from "../../Atoms/Heading";
import { HomeIcon } from "../../Icons/HomeIcon";
import { ButtonRow } from "../../Molecules/ButtonRow";

export const IntroductionModal = () => {
  const { ship, port } = useActiveShipContext();
  const [isOpen, setIsOpen] = useState(true);

  if (!port) {
    return null;
  }

  const close = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} title="Welcome">
      <Prose>
        <p>
          Welcome to <em>{port.name}</em>. This is your home{" "}
          <InlineIcon size={TINY_ICON}>
            <HomeIcon />
          </InlineIcon>{" "}
          space port where your ships will launch from. It is a Sanctuary{" "}
          <InlineIcon size={TINY_ICON}>
            <SanctuaryIcon />
          </InlineIcon>{" "}
          where you cannot be harmed.
        </p>
        <H3 as="h2">Your mission</H3>
        <p>
          A distress call has been received from the inhabitants of <em>Saxopholis</em>. They need a Saxophone, and are
          seeking their saviour to deliver it to them. The task is as follows:
        </p>
        <ul>
          <li>
            Explore the galaxy to map out all 1000 known planets and find <em>Saxopholis</em>
          </li>
          <li>
            Find a crate containing a Saxophone and successfully deliver it to <em>Saxopholis</em>
          </li>
        </ul>
        <p>
          You have been trusted by headquarters to fulfill this mission. To make the journey, an ultra-strong Reticulum
          Shuttle by the name of <em>{ship.name}</em> has just been launched. It can carry one crate. You must look
          after it.
        </p>
        <p>The competition is fierce. Be careful</p>
      </Prose>
      <ButtonRow>
        <ConfirmButton onClick={close}>Let's go</ConfirmButton>
      </ButtonRow>
    </Modal>
  );
};
