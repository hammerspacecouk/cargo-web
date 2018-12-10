import * as React from "react";
import styled from "styled-components";
import TickIcon from "../../../Icons/TickIcon/TickIcon";
import { messageContent, SingleProps, StyledMessage } from "../index";
import { COLOURS } from "../../../../styles/colours";

const OkMessage = styled(StyledMessage)`
  background: ${COLOURS.SEMANTIC.OK.BACKGROUND};
  color: ${COLOURS.SEMANTIC.OK.FOREGROUND};
`;

export default function MessageOk({ children }: SingleProps) {
  return <OkMessage>{messageContent(<TickIcon />, children)}</OkMessage>;
}
