import * as React from "react";
import { Crate, CratePlaceholder } from "./Crate";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { ICrateAction } from "@src/interfaces";
import styled from "styled-components";
import { COLOURS } from "@src/styles/colours";
import { H6 } from "@src/components/Atoms/Heading";
import { GRID } from "@src/styles/variables";
import { ListInline } from "@src/components/Atoms/List/ListInline";

export const CratesOnShip = () => {
  const { ship, cratesOnShip } = useActiveShipContext();

  let availableCrates: ICrateAction[] = [];
  let loadedCount = "-";

  if (cratesOnShip) {
    availableCrates = cratesOnShip;
    loadedCount = cratesOnShip.length.toString();
  }

  const placeholderSlots = new Array(ship.shipClass.capacity - availableCrates.length).fill(undefined);

  return (
    <StyledWrapper>
      <Heading as="h3">
        Loaded {loadedCount}/{ship.shipClass.capacity}
      </Heading>
      <List>
        {availableCrates.map((crate, i) => (
          <li key={`crate-${i}`}>
            <Crate crateAction={crate} key={`cos-${crate.crate.id}`} />
          </li>
        ))}
        {placeholderSlots.map((_, i) => (
          <li key={`p-${i}`}>
            <CratePlaceholder loading={cratesOnShip === undefined ? true : undefined} />
          </li>
        ))}
      </List>
    </StyledWrapper>
  );
};

const Heading = styled(H6)`
  position: absolute;
  padding: ${GRID.HALF};
  text-transform: uppercase;
  background: ${COLOURS.GREY.BLACK};
  border-bottom: solid 1px ${COLOURS.GREY.DARKER};
  border-top: solid 1px ${COLOURS.GREY.DARKER};
  top: 100%;
  right: 1px;
  border-left: solid 1px ${COLOURS.GREY.DARKER};
`;

const StyledWrapper = styled.div`
  position: relative;
`;

const List = styled(ListInline)`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  height: 100%;
  min-height: 112px;
  > li {
    vertical-align: top;
    border-right: solid 1px ${COLOURS.GREY.DARKER};
    height: 100%;
    width: 160px;
    > * {
      height: 100%;
    }
  }
`;
