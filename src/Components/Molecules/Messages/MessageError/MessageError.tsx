import * as React from "react";
import styled from "styled-components";
import ErrorIcon from "../../../Icons/ErrorIcon/ErrorIcon";
import { SingleProps, StyledMessage, messageContent } from "../index";
import { COLOURS } from "../../../../styles/colours";

const ErrorMessage = styled(StyledMessage)`
  background: ${COLOURS.SEMANTIC.DANGER.BACKGROUND};
  color: ${COLOURS.SEMANTIC.DANGER.FOREGROUND};
`;

export default function MessageError({ children }: SingleProps) {
  return <ErrorMessage>{messageContent(<ErrorIcon />, children)}</ErrorMessage>;
}
