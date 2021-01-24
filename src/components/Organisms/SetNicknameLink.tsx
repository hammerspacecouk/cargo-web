import React from "react";
import { ActionButton, Button } from "@src/components/Atoms/Button";
import { IProfileResponse } from "@src/data/profile";
import { Prose } from "@src/components/Atoms/Prose";
import { ShieldStrength } from "@src/components/Molecules/ShieldStrength";
import { Modal } from "@src/components/Molecules/Modal";
import { ButtonRow } from "@src/components/Molecules/ButtonRow";
import { Hidden } from "@src/components/Atoms/Hidden";
import { Input } from "@src/components/Atoms/Input";
import { Environment } from "@src/utils/environment";
import { MessageError } from "@src/components/Molecules/Message";

export const SetNicknameLink = ({ token }: { token: IProfileResponse["setNickname"] }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [nameValue, setNameValue] = React.useState("");
  const nameCmp = nameValue.toLowerCase();

  let changeModal = (
    <Prose>
      <p>You must reach the rank of Petty Officer to set a public nickname</p>
    </Prose>
  );

  let errorMessage;
  if (nameCmp.includes("admin")) {
    errorMessage = 'Name cannot include "admin"';
  }

  if (token) {
    changeModal = (
      <form action={`${Environment.clientApiHostname}/profile/set-nickname`} method="POST">
        <input type="hidden" name="token" value={token} />
        {errorMessage && (
          <p>
            <MessageError>{errorMessage}</MessageError>
          </p>
        )}
        <Prose>
          <p>Here you can choose a public nickname. Keep it civil or you will lose this privilege.</p>
          <p>
            <label>
              <Hidden>Enter new nickname:</Hidden>
              <Input
                type="text"
                name="nickname"
                placeholder="Enter new name"
                autoFocus
                maxLength={50}
                required
                value={nameValue}
                onChange={(evt) => setNameValue(evt.target.value)}
              />
            </label>
          </p>
        </Prose>
        <ButtonRow>
          <ActionButton type="submit" disabled={!!errorMessage}>
            Set name
          </ActionButton>
        </ButtonRow>
      </form>
    );
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Edit</Button>
      <Modal isOpen={modalOpen} title="Set Public Nickname" onClose={() => setModalOpen(false)}>
        {changeModal}
      </Modal>
    </>
  );
};
