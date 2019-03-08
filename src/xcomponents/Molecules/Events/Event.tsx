import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { TimeAgo } from "../../Atoms/TimeAgo/TimeAgo";
import { COLOURS } from "../../../styles/colours";

interface IProps {
  time: string;
  children: any;
}

const StyledEvent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  min-height: 32px;
`;

export const EventFlag = styled.span`
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
  line-height: 0;
  position: relative;
  top: -1px;
  border-radius: 50%;
  border: solid 2px ${COLOURS.WHITE.STANDARD};
`;

const Content = styled.span`
  flex: 1;
  margin-right: ${GRID.UNIT};
`;

export const Event = (props: IProps) => (
  <StyledEvent>
    <Content>{props.children}</Content>
    <TimeAgo datetime={new Date(props.time)} />
  </StyledEvent>
);
