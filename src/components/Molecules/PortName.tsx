import * as React from "react";
import styled from "styled-components";
import { IPort } from "../../interfaces";
import { GRID } from "../../styles/variables";
import { SanctuaryIcon } from "../Icons/SanctuaryIcon";

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
  width: 1em;
  height: 1em;
`;

export const PortName = React.memo(({ port }: IProps) => {
  let safeIndicator = null;
  if (port.safeHaven) {
    safeIndicator = (
      <Icon title="Sanctuary">
        <SanctuaryIcon />
      </Icon>
    );
  }
  return (
    <Styled>
      <Text>{port.name}</Text>
      {safeIndicator}
    </Styled>
  );
});
