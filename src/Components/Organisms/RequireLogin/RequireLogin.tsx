import * as React from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { Status } from "../Status/Status";
import { SimplePage } from "../../Templates/SimplePage/SimplePage";

export const RequireLogin = () => (
  <Status code={403}>
    <SimplePage title="You must first log in">
      <LoginForm />
    </SimplePage>
  </Status>
);
