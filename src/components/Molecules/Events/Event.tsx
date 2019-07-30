import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { TimeAgo } from "../../Atoms/TimeAgo";
import { COLOURS } from "../../../styles/colours";
import { IEvent } from "../../../interfaces";
import { SIZES } from "../../../styles/typography";

export interface IEventProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const Event = ({ children, time }: IProps) => {
  return (
    <StyledEvent>
      <Content>{children}</Content>
      <Time datetime={new Date(time)} />
    </StyledEvent>
  );
};

interface IProps {
  readonly time: string;
  readonly children: any;
}

const StyledEvent = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  min-height: 32px;
  flex-wrap: wrap;
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
  min-width: 240px;
  margin-right: ${GRID.UNIT};
  ${SIZES.D};
`;

const Time = styled(TimeAgo)`
  opacity: 0.6;
`;
