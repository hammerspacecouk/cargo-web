import * as React from "react";
import InfoIcon from "../../../Icons/InfoIcon/InfoIcon";
import { messageContent, SingleProps, StyledMessage } from "../index";

export default function MessageInfo({ children }: SingleProps) {
  return (
    <StyledMessage>{messageContent(<InfoIcon />, children)}</StyledMessage>
  );
}
