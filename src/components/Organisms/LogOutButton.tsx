import * as React from "react";
import { useState } from "react";
import { routes } from "../../routes";
import { ConfirmButton, WarningButton } from "../Atoms/Button";
import { CountdownLink } from "../Molecules/CountdownLink";
import { Modal, ModalType } from "../Molecules/Modal";
import { Prose } from "../Atoms/Prose";
import { H4 } from "../Atoms/Heading";
import { ButtonRow } from "../Molecules/ButtonRow";

interface IProps {
  readonly isAnonymous: boolean;
}

export const LogOutButton = ({ isAnonymous }: IProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  let modal;
  if (isAnonymous) {
    modal = (
      <Modal isOpen={modalIsOpen} title="Are you sure?" onClose={closeModal} type={ModalType.DANGER}>
        <Prose>
          <H4>IMPORTANT: READ THIS FIRST</H4>
          <p>
            Your account is anonymous. If you log out, you will not be able to log in to your game again. It will be
            lost forever and we cannot recover it for you. <br />
            There are restrictions in place to remove any advantages in frequently creating new accounts. Don't risk
            losing your game as you may be blocked from creating another.
          </p>
          <p>Are you really sure you want to log out and lose this game forever?</p>
        </Prose>
        <ButtonRow>
          <CountdownLink time={20000} href={routes.getLogout()}>
            Yes, Log out
          </CountdownLink>{" "}
          <ConfirmButton onClick={closeModal}>Cancel</ConfirmButton>
        </ButtonRow>
      </Modal>
    );
  }

  return (
    <>
      <WarningButton
        as="a"
        href={routes.getLogout()}
        onClick={(event: Event) => {
          if (isAnonymous) {
            event.preventDefault();
            setModalIsOpen(true);
          }
        }}
      >
        Log out
      </WarningButton>
      {modal}
    </>
  );
};
