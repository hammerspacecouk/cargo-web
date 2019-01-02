import * as React from "react";
import { LoginForm } from "../components/Organisms/LoginForm/LoginForm";
import { SimplePage } from "../components/Templates/SimplePage/SimplePage";
import { messageQueryString } from "../util/MessageQueryString";

interface IProps {
  query?: string;
}

export const LoginPage = ({ query }: IProps) => {
  return (
    <SimplePage title="Login">
      <LoginForm messages={messageQueryString(query)} />
    </SimplePage>
  );
};
