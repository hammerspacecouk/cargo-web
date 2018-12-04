import * as React from "react";
import * as ModalHandler from "react-modal";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";

interface Props {
  children: any;
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
}

export default (props: Props) => {
  // on server just render nothing (as you can't open modals on server)
  if (typeof window === "undefined") {
    return null;
  }

  const title = props.title || "";
  const appElement = (window as any).document.getElementById("root");

  let closeButton = null;
  if (props.onClose) {
    closeButton = (
      <button className="modal__close" onClick={props.onClose}>
        <CloseIcon />
      </button>
    );
  }

  return (
    <ModalHandler
      appElement={appElement}
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      closeTimeoutMS={300}
      contentLabel={title}
      className={{
        base: "modal",
        afterOpen: "modal--after-open",
        beforeClose: "modal--before-close"
      }}
      overlayClassName={{
        base: "modal__overlay",
        afterOpen: "modal__overlay--after-open",
        beforeClose: "modal__overlay--before-close"
      }}
    >
      <div className="modal__header">
        <h2 className="modal__title">{title}</h2>
        {closeButton}
      </div>
      <div className="modal__body">
        <div className="modal__content">{props.children}</div>
      </div>
    </ModalHandler>
  );
};
