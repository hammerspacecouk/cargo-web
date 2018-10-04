import * as React from "react";
import routes from "../../routes";
import { MessageError, MessageWarning } from "../../Components/Panel/Messages";
import CountdownLink from "../Button/CountdownLink";
import Modal from "../../Components/Panel/Modal";

interface Props {
  readonly isAnonymous: boolean;
}

interface LocalState {
  modalIsOpen: boolean;
}

export default class LogOutButtonContainer extends React.Component<
  Props,
  LocalState
> {
  state: LocalState = {
    modalIsOpen: false
  };

  handleClick = (event: Event) => {
    if (!this.props.isAnonymous) {
      return;
    }
    event.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    let warning;
    let modal;
    if (this.props.isAnonymous) {
      warning = (
        <MessageWarning>
          Your account is currently anonymous. If you logout, you will never be
          able to continue your game.
        </MessageWarning>
      );
      modal = (
        <Modal
          isOpen={this.state.modalIsOpen}
          title="Are you sure?"
          onClose={this.closeModal}
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
              onClick={this.closeModal}
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
          onClick={this.handleClick.bind(this)}
        >
          Log out
        </a>
        {modal}
      </div>
    );
  }
}
