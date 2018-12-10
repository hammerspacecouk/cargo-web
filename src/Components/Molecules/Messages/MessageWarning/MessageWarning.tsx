import * as React from "react";
import styled from "styled-components";
import WarningIcon from "../../../Icons/WarningIcon/WarningIcon";
import { messageContent, SingleProps, StyledMessage } from "../index";
import { COLOURS } from "../../../../styles/colours";


const WarningMessage = styled(StyledMessage)`
  background: ${COLOURS.SEMANTIC.WARNING.BACKGROUND};
  color: ${COLOURS.SEMANTIC.WARNING.FOREGROUND};
`;

export default function MessageOk({ children }: SingleProps) {
  return (
    <WarningMessage>{messageContent(<WarningIcon />, children)}</WarningMessage>
  );
}
