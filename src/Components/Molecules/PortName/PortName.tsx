import * as React from "react";
import styled from "styled-components";
import { IPort } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";
import { ShieldIcon } from "../../Icons/ShieldIcon/ShieldIcon";

interface IProps {
  port: IPort;
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

export const PortName = ({ port }: IProps) => {
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
};
