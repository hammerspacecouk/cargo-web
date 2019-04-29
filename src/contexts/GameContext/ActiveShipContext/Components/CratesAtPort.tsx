import * as React from "react";
import styled from "styled-components";
import { H6 } from "../../../../components/Atoms/Heading/Heading";
import { ListInline } from "../../../../components/Atoms/Lists/ListInline/ListInline";
import { Loading } from "../../../../components/Atoms/Loading/Loading";
import { CrateAtPort } from "../../../../pages/Play/Port/CrateAtPort";
import { useActiveShipContext } from "../ActiveShipContext";
import { COLOURS, scrollbarStyles } from "../../../../styles/colours";
import { GRID } from "../../../../styles/variables";

interface IProps {
  className?: string;
}

const List = styled(ListInline)`
  overflow-x: auto;
  white-space: nowrap;
  ${scrollbarStyles};
  height: 100%;
  > li {
    border-right: solid 1px ${COLOURS.GREY.DARKER};
    height: 100%;
    width: 160px;
    > * {
        height: 100%;
    }
  }
`;

const Heading = styled(H6)`
    position: absolute;
    bottom: 100%;
    left: 0;
    border-top: solid 1px ${COLOURS.GREY.DARKER};
    border-right: solid 1px ${COLOURS.GREY.DARKER};
    border-bottom: solid 1px ${COLOURS.GREY.DARKER};
    padding: ${GRID.HALF};
    text-transform: uppercase;
    background: ${COLOURS.GREY.BLACK};
`;

const StyledWrapper = styled.div`
    position: relative;
`;

export const CratesAtPort = ({ className }: IProps) => {
  const { cratesInPort } = useActiveShipContext();

  if (cratesInPort === undefined) {
    return <Loading />;
  } // todo - pretty loader

  return (
    <StyledWrapper className={className}>
      <Heading as="h3">Available ({cratesInPort.length})</Heading>
      <List>
        {cratesInPort.map(crateAction => (
          <li key={`cap-${crateAction.crate.id}`}>
            <CrateAtPort crateAction={crateAction} />
          </li>
        ))}
      </List>
    </StyledWrapper>
  );
};
