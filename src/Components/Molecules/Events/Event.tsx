import * as React from "react";
import TimeAgoContainer from "../../Atoms/TimeAgo/TimeAgo";
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
  .flag {
    display: inline-block;
    width: 48px;
    vertical-align: middle;
    line-height: 0;
    position: relative;
    top: -1px;
  }
`; // todo - "flag" declaration should be handled differently

const Content = styled.span`
  flex: 1;
  margin-right: ${GRID.UNIT};
`;

export default (props: Props) => (
  <StyledEvent>
    <Content>{props.children}</Content>
    <TimeAgoContainer datetime={new Date(props.time)} />
  </StyledEvent>
);
