import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { TimeAgo } from "../../Atoms/TimeAgo";
import { COLOURS } from "../../../styles/colours";
import { componentTokenAt } from "../../../utils/componentTokenAt";
import { TextCursor } from "../../Atoms/TextCursor";
import { IEvent } from "../../../interfaces";
import { SIZES } from "../../../styles/typography";

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

const getChildrenUntil = (children: any, index: number) => {
  let counter = 0;
  let bits = [];
  while (counter <= index && componentTokenAt(children, counter)) {
    bits.push(<React.Fragment key={counter}>{componentTokenAt(children, counter)}</React.Fragment>);
    counter++;
  }
  if (componentTokenAt(children, counter)) {
    bits.push(<TextCursor key={counter} />);
  }
  return bits;
};

export const Event = ({ children, time, onAnimated }: IProps) => {
  const [visibleChars, setVisibleChars] = React.useState(0);
  const [done, setDone] = React.useState(!onAnimated);

  const addCharacter = () => {
    setVisibleChars(visibleChars + 1);
  };

  React.useEffect(() => {
    if (!onAnimated) {
      if (!done) {
        setDone(true);
      }
      return;
    }

    let timer: number;
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
  }, [visibleChars, onAnimated]);

  return (
    <StyledEvent>
      <Content>{done ? children : getChildrenUntil(children, visibleChars)}</Content>
      <Time datetime={new Date(time)} />
    </StyledEvent>
  );
};
