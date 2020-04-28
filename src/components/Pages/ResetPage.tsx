import * as React from "react";
import { ConfirmButton, DangerButton } from "../Atoms/Button";
import { Prose } from "../Atoms/Prose";
import { TokenButton } from "../Molecules/TokenButton";
import { routes } from "../../routes";
import { ButtonRow } from "../Molecules/ButtonRow";
import { H4 } from "../Atoms/Heading";
import { SimplePage } from "../Templates/SimplePage";
import { PanelPage } from "../Templates/PanelPage";
import { Icon, TINY_ICON } from "../Atoms/Icon";
import { CreditsIcon } from "../Icons/CreditsIcon";
import { MessageError } from "../Molecules/Message";

export interface IResetPageProps {
  token?: string;
  ineligible?: string;
}

export const ResetPage = ({ token, ineligible }: IResetPageProps) => {
  const actionToken = {
    path: "/profile/reset",
    token: token || "",
  };

  return (
    <SimplePage>
      <PanelPage title="Reset Game">
        {ineligible && <Ineligible />}
        {token ? "Are you sure? This cannot be undone." : <Description />}
        <ButtonRow>
          <ConfirmButton as="a" href={routes.getPlayProfile()}>
            Cancel
          </ConfirmButton>
          {!ineligible && (
            <TokenButton token={actionToken}>
              <DangerButton type="submit">Yes</DangerButton>
            </TokenButton>
          )}
        </ButtonRow>
      </PanelPage>
    </SimplePage>
  );
};

const Ineligible = () => (
  <MessageError>
    Sorry, this game has not reached the threshold to be eligible for reset. This is to prevent abuse.
  </MessageError>
);

const Description = () => (
  <Prose>
    <H4>IMPORTANT: READ THIS FIRST</H4>
    <p>The following will happen:</p>
    <ul>
      <li>All ships in your fleet will be deleted</li>
      <li>
        <Icon size={TINY_ICON}>
          <CreditsIcon />
        </Icon>{" "}
        will reset to 0
      </li>
      <li>All mission progress will be reset (you will start at Tutorial)</li>
      <li>All abilities and power ups will be lost</li>
    </ul>
    <hr />
    <p>
      The following will <strong>NOT</strong> change:
    </p>
    <ul>
      <li>Profile nickname and picture</li>
      <li>Your game subscription (you do not have to pay again)</li>
      <li>Your best winning time and position on the Winners board (if applicable)</li>
      <li>Home planet setting</li>
    </ul>
    <hr />
    <p>
      This action is <strong>NOT</strong> reversible. We cannot recover your game after this. Are you really sure you
      want to reset this game and lose all progress?
    </p>
  </Prose>
);
