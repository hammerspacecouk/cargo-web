import * as React from "react";
import { LoginForm } from "../../../contexts/GameContext/Components/LoginForm";
import { Status } from "../Status/Status";
import { PanelPage } from "../../Templates/PanelPage/PanelPage";

export const RequireLogin = () => (
  <Status code={403}>
    <PanelPage title="Login">
      <LoginForm />
    </PanelPage>
  </Status>
);
