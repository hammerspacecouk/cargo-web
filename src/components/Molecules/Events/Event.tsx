import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { TimeAgo } from "../../Atoms/TimeAgo/TimeAgo";
import { COLOURS } from "../../../styles/colours";
import { componentTokenAt } from "../../../util/ComponentTokenAt";
import { TextCursor } from "../../Atoms/TextCursor/TextCursor";
import { IEvent } from "../../../Interfaces";

export interface IEventProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
  readonly onAnimated?: () => void;
}

interface IProps {
  readonly time: string;
  readonly children: any;
  readonly onAnimated?: () => void;
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

const getChildrenUntil = (children, index) => {
  let counter = 0;
  let bits = [];
  while (counter <= index && componentTokenAt(children, counter)) {
    bits.push(<React.Fragment key={counter}>{componentTokenAt(children, counter)}</React.Fragment>);
    counter++;
  }
  if (componentTokenAt(children, counter)) {
    bits.push(<TextCursor key={counter}/>);
  }
  return bits;
};

export const Event = ({children, time, onAnimated}: IProps) => {
  const [visibleChars, setVisibleChars] = React.useState(0);
  const [done, setDone] = React.useState(!onAnimated);

  const addCharacter = () => {
    setVisibleChars(visibleChars + 1);
  };

  React.useEffect(
    () => {
      if (!onAnimated) {
        if (!done) {setDone(true)}
        return;
      }

      let timer;
      if (componentTokenAt(children, visibleChars)) {
        timer = window.setTimeout(addCharacter, 50);
      } else {
        setDone(true);
        if (onAnimated) {
          onAnimated();
        }
      }
      return () => {
        window.clearTimeout(timer);
      };
    }, [visibleChars, onAnimated]
  );

  return (
  <StyledEvent>
    <Content>{done ? children : getChildrenUntil(children, visibleChars)}</Content>
    <TimeAgo datetime={new Date(time)}/>
  </StyledEvent>
  );
};
