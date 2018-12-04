import * as React from "react";
import styled from "styled-components";
import { colours } from "../../../../GlobalStyle";
import TickIcon from "../../../Icons/TickIcon/TickIcon";
import { messageContent, SingleProps, StyledMessage } from "../index";

const OkMessage = styled(StyledMessage)`
  background: ${colours.green[1]};
  color: ${colours.green[9]};
  border-color: ${colours.green[7]};
`;

export default function MessageOk({children}: SingleProps) {
  return (
    <OkMessage>
      {messageContent(<TickIcon />, children)}
    </OkMessage>
  );
}
