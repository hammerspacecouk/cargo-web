import * as React from "react";
import styled from "styled-components";
import ShieldIcon from "../../Icons/ShieldIcon/ShieldIcon";
import { grid } from "../../../GlobalStyle";

interface PropsInterface { // todo - convert to using PortInterface
  name: string;
  safe: boolean;
}

const Styled = styled.span`
    display: flex;
    align-items: center;
`;
const Text = styled.span`
    display: inline-block;
`;
const Icon = styled.abbr`
    display: inline-block;
    margin-left: ${grid.unit / 2}px;
    width: 28px;
    height: 28px;
`;

export default function PortName({name, safe}: PropsInterface) {
  let safeIndicator = null;
  if (safe) {
    safeIndicator = (
      <Icon title="Safe Haven">
        <ShieldIcon />
      </Icon>
    );
  }
  return (
    <Styled>
      <Text>{name}</Text>
      {safeIndicator}
    </Styled>
  );
}
