import { parse as parseQueryString } from "query-string";
import * as React from "react";
import {
  ConfirmButton,
  DangerButton,
} from "../../components/Atoms/Button/Button";
import { Prose } from "../../components/Atoms/Prose/Prose";
import { TextCenter } from "../../components/Atoms/Text/Text";
import { TokenButton } from "../../components/Molecules/TokenButton/TokenButton";
import { Error } from "../../components/Organisms/Error/Error";
import { ProfileLayout } from "../../components/Templates/ProfileLayout/ProfileLayout";
import { routes } from "../../routes";

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
  const stage = parseInt(queryData.stage || 1, 10);
  if (stage < 1 || stage > 3) {
    return <Error code={400} message="Invalid stage provided" />;
  }
  const stageText = stageTexts[stage];
  const token = {
    path: "/profile/delete",
    token: queryData.token || "",
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