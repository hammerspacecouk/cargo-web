import * as React from "react";
import { SimplePage } from "../../Templates/SimplePage/SimplePage";
import { LoginForm } from "../LoginForm/LoginForm";
import { Status } from "../Status/Status";

export const RequireLogin = () => (
  <Status code={403}>
    <SimplePage title="You must first log in">
      <LoginForm />
    </SimplePage>
  </Status>
);
