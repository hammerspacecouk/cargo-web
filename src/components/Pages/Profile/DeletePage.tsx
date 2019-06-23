import { parse as parseQueryString } from "query-string";
import * as React from "react";
import { ConfirmButton, DangerButton } from "../../Atoms/Button";
import { Prose } from "../../Atoms/Prose";
import { TextCenter } from "../../Atoms/Text";
import { TokenButton } from "../../Molecules/TokenButton";
import { ProfileLayout } from "../../Templates/ProfileLayout";
import { routes } from "../../../routes";

interface IProps {
  query?: string;
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

export const DeletePage = ({ query }: IProps) => {
  const queryData = parseQueryString(query);
  const stage = parseInt((queryData.stage as string) || "1", 10);
  if (stage < 1 || stage > 3) {
    return "Invalid stage provided"; // todo - error status and 400 code
  }
  const stageText = stageTexts[stage];
  const token = {
    path: "/profile/delete",
    token: (queryData.token as string) || "",
  };

  return (
    <ProfileLayout title="Delete account">
      <Prose>
        <h2>{stage}/3</h2>
        <p>{stageText}</p>
      </Prose>

      <TextCenter>
        <ConfirmButton as="a" href={routes.getProfile()}>
          Cancel
        </ConfirmButton>
        <TokenButton token={token}>
          <DangerButton type="submit">Yes</DangerButton>
        </TokenButton>
      </TextCenter>
    </ProfileLayout>
  );
};
