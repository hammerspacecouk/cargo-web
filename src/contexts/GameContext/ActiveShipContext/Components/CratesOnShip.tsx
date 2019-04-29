import * as React from "react";
import styled from "styled-components";
import { ListInline } from "../../../../components/Atoms/Lists/ListInline/ListInline";
import { Loading } from "../../../../components/Atoms/Loading/Loading";
import { CrateOnShip, CrateOnShipPlaceholder } from "../../../../pages/Play/Port/CrateOnShip";
import { useActiveShipContext } from "../ActiveShipContext";
import { COLOURS, scrollbarStyles } from "../../../../styles/colours";
import { H6 } from "../../../../components/Atoms/Heading/Heading";
import { GRID } from "../../../../styles/variables";

interface IProps {
  className?: string;
}

// todo - abstract this to use in both places
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

const StyledWrapper = styled.div`
    position: relative;
`;

const Heading = styled(H6)`
    position: absolute;
    top: 100%;
    right: 0;
    border-top: solid 1px ${COLOURS.GREY.DARKER};
    border-left: solid 1px ${COLOURS.GREY.DARKER};
    border-bottom: solid 1px ${COLOURS.GREY.DARKER};
    padding: ${GRID.HALF};
    text-transform: uppercase;
    background: ${COLOURS.GREY.BLACK};
`;

export const CratesOnShip = ({ className }: IProps) => {
  const { ship, cratesOnShip } = useActiveShipContext();

  if (cratesOnShip === undefined) {
    return <Loading />;
  } // todo - pretty loader

  const placeholderSlots = new Array(
    ship.shipClass.capacity - cratesOnShip.length
  ).fill(undefined);
  const keyStart = cratesOnShip.length;
  return (
    <StyledWrapper className={className}>
      <Heading as="h3">Loaded {cratesOnShip.length}/{ship.shipClass.capacity}</Heading>
      <List>
        {cratesOnShip.map(crate => (
          <li key={`cos-${crate.crate.id}`}>
            <CrateOnShip crateAction={crate} />
          </li>
        ))}
        {placeholderSlots.map((_, i) => (
          <li key={`p-${i + keyStart}`}>
            <CrateOnShipPlaceholder />
          </li>
        ))}
      </List>
    </StyledWrapper>
  );
};
