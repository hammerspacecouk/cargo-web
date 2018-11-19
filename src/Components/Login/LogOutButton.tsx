import * as React from "react";
import routes from "../../routes";
import CountdownLink from "../Button/CountdownLink";
import Modal from "../Panel/Modal";
import MessageWarning from "../Molecules/Messages/MessageWarning/MessageWarning";
import MessageError from "../Molecules/Messages/MessageError/MessageError";

interface Props {
  readonly isAnonymous: boolean;
}

export default ({isAnonymous}: Props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const closeModal = () => {
    setModalIsOpen(true);
  };

  let warning;
  let modal;
  if (isAnonymous) {
    warning = (
      <MessageWarning>
        Your account is currently anonymous. If you logout, you will never be
        able to continue your game.
      </MessageWarning>
    );
    modal = (
      <Modal
        isOpen={modalIsOpen}
        title="Are you sure?"
        onClose={closeModal}
      >
        <MessageError>
          IMPORTANT: READ THIS FIRST <br />
          Your account is anonymous. If you log out, you will not be able to
          log in to your game again. It will be lost forever and we cannot
          recover it for you. <br />
          There are restrictions in place to remove any advantages in
          frequently creating new accounts. Don't risk losing your game as you
          may be blocked from creating another.
          <br />
          Are you really sure you want to log out and lose this game forever?
        </MessageError>
        <div className="modal__action">
          <CountdownLink
            time={20000}
            href={routes.getLogout()}
            className="button button--danger"
          >
            Yes, Log out
          </CountdownLink>{" "}
          <button
            className="button button--confirm"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <div>
      {warning}
      <a
        className="button"
        href={routes.getLogout()}
        onClick={(event) => {
          if (isAnonymous) {
            event.preventDefault();
            setModalIsOpen(true);
          }
        }}
      >
        Log out
      </a>
      {modal}
    </div>
  );
};
