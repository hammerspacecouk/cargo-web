import * as React from "react";
import styled from "styled-components";
import { colours } from "../../../../GlobalStyle";
import ErrorIcon from "../../../Icons/ErrorIcon/ErrorIcon";
import { SingleProps, StyledMessage, messageContent } from "../index";

const ErrorMessage = styled(StyledMessage)`
  background: ${colours.red[1]};
  color: ${colours.red[9]};
  border-color: ${colours.red[7]};
`;

export default function MessageError({children}: SingleProps) {
  return (
    <ErrorMessage>
      {messageContent(<ErrorIcon />, children)}
    </ErrorMessage>
  );
}
