import * as React from "react";
import { TimeAgo } from "../../Atoms/TimeAgo/TimeAgo";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";

interface Props {
  time: string;
  children: any;
}

const StyledEvent = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

export const EventFlag = styled.span`
    display: inline-block;
    width: 48px;
    vertical-align: middle;
    line-height: 0;
    position: relative;
    top: -1px;
`;

const Content = styled.span`
  flex: 1;
  margin-right: ${GRID.UNIT};
`;

export default (props: Props) => (
  <StyledEvent>
    <Content>{props.children}</Content>
    <TimeAgo datetime={new Date(props.time)} />
  </StyledEvent>
);
