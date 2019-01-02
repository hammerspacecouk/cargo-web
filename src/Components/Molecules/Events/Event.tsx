import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { TimeAgo } from "../../Atoms/TimeAgo/TimeAgo";

interface IProps {
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

export default (props: IProps) => (
  <StyledEvent>
    <Content>{props.children}</Content>
    <TimeAgo datetime={new Date(props.time)} />
  </StyledEvent>
);
