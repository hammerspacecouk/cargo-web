import * as React from "react";
import * as ModalHandler from "react-modal";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";
import styled, { createGlobalStyle } from "styled-components";
import { GRID, Z_INDEX } from "../../styles/variables";
import { COLOURS, hexToRGBa } from "../../styles/colours";
import { H3 } from "../Atoms/Heading/Heading";

interface Props {
  children: any;
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
}

const ModalStyles = createGlobalStyle`
    .modal {
        margin: ${GRID.UNIT};
        max-height: calc(100vh - ${GRID.DOUBLE});
        max-width: 800px;
        border: 1px solid ${COLOURS.BODY.TEXT};
        box-shadow: 0 0 32px ${hexToRGBa(COLOURS.BODY.TEXT,0.6)};
        background: ${COLOURS.BODY.BACKGROUND};
        color: ${COLOURS.BODY.TEXT};
        border-radius: 4px;
        outline: none;
        z-index: ${Z_INDEX.MODAL_PANEL};
        will-change: transform;
        transform: scale(0);
        transition: .3s cubic-bezier(0.13, 0.76, 0.49, 1.65);
    }
    .modal__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${Z_INDEX.MODAL_BLANKING};
      will-change: opacity;
      opacity: 0;
      transition: .2s linear;
    }
    .modal--after-open {
      transform: scale(1);
    }
    .modal--before-close {
      transform: scale(0);
    }
    .modal__overlay--after-open {
      opacity: 1;
    }
    .modal__overlay--before-close {
      opacity: 0;
    }
`;

const ModalClose = styled.button`
    height: 32px;
    width: 32px;
    background: none;
    border: none;
    padding: 0;
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: flex-start;
    padding: ${GRID.UNIT};
    border-bottom: solid 1px;
`;

const ModalTitle = styled(H3)`
    line-height: 32px;
    flex: 1;
`;

const ModalBody = styled.div`
    max-height: 80vh;
    overflow: auto;
`;

const ModalContent = styled.div`
    padding: ${GRID.UNIT};
`;

export const ModalActions = styled.div`
    text-align: center;
    margin-top: ${GRID.UNIT};
`;

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
      <ModalClose onClick={props.onClose}>
        <CloseIcon />
      </ModalClose>
    );
  }

  return (
    <>
      <ModalStyles />
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
        <ModalHeader>
          <ModalTitle as="h2">{title}</ModalTitle>
          {closeButton}
        </ModalHeader>
        <ModalBody>
          <ModalContent>{props.children}</ModalContent>
        </ModalBody>
      </ModalHandler>
    </>
  );
};
