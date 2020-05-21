import * as React from "react";
import ReactModal from "react-modal";
import styled, { css } from "styled-components";
import { COLOURS, hexToRGBa } from "@src/styles/colours";
import { GRID, MAX_PANEL_WIDTH, Z_INDEX } from "@src/styles/variables";
import { H3 } from "@src/components/Atoms/Heading";
import { PanelClose } from "@src/components/Atoms/PanelClose";

export enum ModalType {
  WARNING = "modal--warning",
  DANGER = "modal--danger",
}

interface IProps {
  children: any;
  title?: string;
  type?: ModalType;
  isOpen: boolean;
  onClose?: () => void;
}

export const modalStyles = css`
  .modal {
    margin: ${GRID.UNIT};
    max-height: calc(100vh - ${GRID.DOUBLE});
    max-width: ${MAX_PANEL_WIDTH};
    border: 1px solid ${COLOURS.BODY.TEXT};
    box-shadow: 0 0 32px ${hexToRGBa(COLOURS.BODY.TEXT, 0.6)};
    background: ${COLOURS.BODY.BACKGROUND};
    color: ${COLOURS.BODY.TEXT};
    border-radius: 4px;
    outline: none;
    z-index: ${Z_INDEX.MODAL_PANEL};
    will-change: transform;
    transform: scale(0);
    transition: 0.3s cubic-bezier(0.13, 0.76, 0.49, 1);
  }
  .modal--danger {
    border: 1px solid ${COLOURS.SEMANTIC.DANGER.KEY};
    box-shadow: 0 0 32px ${hexToRGBa(COLOURS.SEMANTIC.DANGER.KEY, 0.6)};
    color: ${COLOURS.SEMANTIC.DANGER.KEY};
  }
  .modal--warning {
    border: 1px solid ${COLOURS.SEMANTIC.WARNING.KEY};
    box-shadow: 0 0 32px ${hexToRGBa(COLOURS.SEMANTIC.WARNING.KEY, 0.6)};
    color: ${COLOURS.SEMANTIC.WARNING.KEY};
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
    transition: 0.2s linear;
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

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${GRID.UNIT};
  border-bottom: solid 1px;
`;

const ModalTitle = styled(H3)<{ center: boolean }>`
  line-height: 32px;
  flex: 1;
  ${({ center }) =>
    center &&
    css`
      text-align: center;
    `}
`;

const ModalBody = styled.div`
  max-height: 80vh;
  overflow: auto;
  color: ${COLOURS.WHITE.STANDARD};
`;

const ModalContent = styled.div`
  padding: ${GRID.UNIT};
`;

export const Modal = React.memo((props: IProps) => {
  // on server just render nothing (as you can't open modals on server)
  if (typeof window === "undefined") {
    return null;
  }

  const title = props.title || "";
  const appElement = (window as any).document.getElementById("__next");

  let closeButton = null;
  if (props.onClose) {
    closeButton = <PanelClose onClick={props.onClose} />;
  }

  return (
    <ReactModal
      appElement={appElement}
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      closeTimeoutMS={300}
      contentLabel={title}
      className={{
        afterOpen: "modal--after-open",
        base: `modal ${props.type}`,
        beforeClose: "modal--before-close",
      }}
      overlayClassName={{
        afterOpen: "modal__overlay--after-open",
        base: "modal__overlay",
        beforeClose: "modal__overlay--before-close",
      }}
    >
      <ModalHeader>
        <ModalTitle center={!closeButton} as="h2">
          {title}
        </ModalTitle>
        {closeButton}
      </ModalHeader>
      <ModalBody>
        <ModalContent>{props.children}</ModalContent>
      </ModalBody>
    </ReactModal>
  );
});
