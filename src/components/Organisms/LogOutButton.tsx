import * as React from "react";
import { routes } from "../../routes";
import { Button, ConfirmButton } from "../Atoms/Button";
import { CountdownLink } from "../Molecules/CountdownLink";
import { MessageWarning } from "../Molecules/Message";
import { Modal, ModalActions, ModalType } from "../Molecules/Modal";

interface IProps {
  readonly isAnonymous: boolean;
}

export const LogOutButton = ({ isAnonymous }: IProps) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  let warning;
  let modal;
  if (isAnonymous) {
    warning = (
      <MessageWarning>
        Your account is currently anonymous. If you logout, you will never be able to continue your game.
      </MessageWarning>
    );
    modal = (
      <Modal isOpen={modalIsOpen} title="Are you sure?" onClose={closeModal} type={ModalType.DANGER}>
        IMPORTANT: READ THIS FIRST <br />
        Your account is anonymous. If you log out, you will not be able to log in to your game again. It will be lost
        forever and we cannot recover it for you. <br />
        There are restrictions in place to remove any advantages in frequently creating new accounts. Don't risk losing
        your game as you may be blocked from creating another.
        <br />
        Are you really sure you want to log out and lose this game forever?
        <ModalActions>
          <CountdownLink time={20000} href={routes.getLogout()}>
            Yes, Log out
          </CountdownLink>{" "}
          <ConfirmButton onClick={closeModal}>Cancel</ConfirmButton>
        </ModalActions>
      </Modal>
    );
  }

  return (
    <div>
      {warning}
      <Button
        as="a"
        href={routes.getLogout()}
        onClick={event => {
          if (isAnonymous) {
            event.preventDefault();
            setModalIsOpen(true);
          }
        }}
      >
        Log out
      </Button>
      {modal}
    </div>
  );
};
