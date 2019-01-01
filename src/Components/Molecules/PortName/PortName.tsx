import * as React from "react";
import styled from "styled-components";
import ShieldIcon from "../../Icons/ShieldIcon/ShieldIcon";
import { GRID } from "../../../styles/variables";
import { PortInterface } from "../../../Interfaces";

interface PropsInterface {
  port: PortInterface;
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
  margin-left: ${GRID.HALF};
  width: 28px;
  height: 28px;
`;

export default function PortName({ port }: PropsInterface) {
  let safeIndicator = null;
  if (port.safeHaven) {
    safeIndicator = (
      <Icon title="Safe Haven">
        <ShieldIcon />
      </Icon>
    );
  }
  return (
    <Styled>
      <Text>{port.name}</Text>
      {safeIndicator}
    </Styled>
  );
}
