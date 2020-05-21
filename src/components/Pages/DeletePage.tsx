import * as React from "react";
import { ConfirmButton, DangerButton } from "@src/components/Atoms/Button";
import { Prose } from "@src/components/Atoms/Prose";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { routes } from "@src/routes";
import { ButtonRow } from "@src/components/Molecules/ButtonRow";
import { H3 } from "@src/components/Atoms/Heading";
import { SimplePage } from "@src/components/Templates/SimplePage";
import { PanelPage } from "@src/components/Templates/PanelPage";

export interface IDeletePageProps {
  stage?: number;
  token?: string;
}

const stageTexts = [
  ``,
  `Are you aware that if you go ahead to the last screen and press the
      ‘Yes’ button, you will lose all data and your account completely?`,
  `Are you certain you understand that if you proceed and press the ‘Yes’
      button on the next screen that you will lose your game and it cannot be recovered?`,
  `All data will now be deleted and you will be signed out.
      Press ‘Yes’ to proceed.`,
];

export const DeletePage = ({ stage, token }: IDeletePageProps) => {
  const stageText = stageTexts[stage];
  const actionToken = {
    path: "/profile/delete",
    token: token || "",
  };

  return (
    <SimplePage>
      <PanelPage title="Delete Account">
        <Prose>
          <H3 as="h2">{stage}/3</H3>
          <p>{stageText}</p>
        </Prose>
        <ButtonRow>
          <ConfirmButton as="a" href={routes.getPlayProfile()}>
            Cancel
          </ConfirmButton>
          <TokenButton token={actionToken}>
            <DangerButton type="submit">Yes</DangerButton>
          </TokenButton>
        </ButtonRow>
      </PanelPage>
    </SimplePage>
  );
};
