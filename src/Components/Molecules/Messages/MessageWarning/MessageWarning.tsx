import * as React from "react";
import styled from "styled-components";
import { colours } from "../../../../GlobalStyle";
import WarningIcon from "../../../Icons/WarningIcon/WarningIcon";
import { messageContent, SingleProps, StyledMessage } from "../index";

const WarningMessage = styled(StyledMessage)`
  background: ${colours.yellow[1]};
  color: ${colours.yellow[9]};
  border-color: ${colours.yellow[7]};
`;

export default function MessageOk({children}: SingleProps) {
  return (
    <WarningMessage>
      {messageContent(<WarningIcon />, children)}
    </WarningMessage>
  );
}
