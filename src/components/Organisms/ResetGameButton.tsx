import * as React from "react";
import { useState } from "react";
import {AddButton, ConfirmButton, DangerButton} from "../Atoms/Button";
import { Modal, ModalType } from "../Molecules/Modal";
import { Prose } from "../Atoms/Prose";
import { H4 } from "../Atoms/Heading";
import { ButtonRow } from "../Molecules/ButtonRow";
import {CreditsIcon} from "../Icons/CreditsIcon";
import {Icon, TINY_ICON} from "../Atoms/Icon";
import {Environment} from "../../utils/environment";

interface IProps {
  token: string | null;
}

export const ResetGameButton = ({ token }: IProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modal = (
      <Modal isOpen={modalIsOpen} title="Are you sure?" onClose={closeModal} type={ModalType.DANGER}>
        <Prose>
          <H4>IMPORTANT: READ THIS FIRST</H4>
          <p>
            The following will happen:
          </p>
          <ul>
            <li>All ships in your fleet will be deleted</li>
            <li><Icon size={TINY_ICON}><CreditsIcon /></Icon> will reset to 0</li>
            <li>All mission progress will be reset (you will start at Tutorial)</li>
            <li>All abilities and power ups will be lost</li>
          </ul>
          <hr />
          <p>The following will <strong>NOT</strong> change:</p>
          <ul>
            <li>Profile nickname and picture</li>
            <li>Your game subscription (you do not have to pay again)</li>
            <li>Your winning time and position on the Winners board (if applicable)</li>
            <li>Home planet setting</li>
          </ul>
          <hr />
          <p>
            This action is <strong>NOT</strong> reversible. We cannot recover your game after this.
            Are you really sure you want to reset this game and lose all progress?
          </p>
        </Prose>
        <ButtonRow>
          <form method="post" action={`${Environment.clientApiHostname}/profile/reset`}>
            <input type="hidden" name="token" value={token} />
            <DangerButton type="submit">
              Yes, Reset Game
            </DangerButton>
          </form>
          <ConfirmButton onClick={closeModal}>Cancel</ConfirmButton>
        </ButtonRow>
      </Modal>
    );

  return (
    <>
      <DangerButton
        onClick={(event: Event) => {
            event.preventDefault();
            setModalIsOpen(true);
        }}
      >
        Reset Game
      </DangerButton>
      {modal}
    </>
  );
};
