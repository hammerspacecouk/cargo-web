import * as React from "react";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { Crate, CratePlaceholder } from "./Crate";
import styled from "styled-components";
import { COLOURS } from "@src/styles/colours";
import { H6 } from "@src/components/Atoms/Heading";
import { GRID } from "@src/styles/variables";
import { ListUnstyled } from "@src/components/Atoms/List/ListUnstyled";
import { BREAKPOINTS } from "@src/styles/media";

export const CratesAtPort = () => {
  const { cratesInPort } = useActiveShipContext();
  let crates;
  let totalAvailable = "-";

  if (cratesInPort) {
    crates = cratesInPort.map((crateAction) => <Crate key={`cap-${crateAction.crate.id}`} crateAction={crateAction} />);
    totalAvailable = cratesInPort.length.toString();
  } else {
    const placeholderSlots = new Array(3).fill(undefined);
    crates = placeholderSlots.map((_, i) => <CratePlaceholder key={`p-${i}`} loading={true} />);
  }

  return (
    <StyledWrapper>
      <Heading as="h3">Available ({totalAvailable})</Heading>
      <List>
        {crates.map((crate, i) => (
          <li key={`crate-${i}`}>{crate}</li>
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
  bottom: 100%;
  left: 0;
  border-right: solid 1px ${COLOURS.GREY.DARKER};
`;

const StyledWrapper = styled.div`
  position: relative;
`;

const List = styled(ListUnstyled)`
  margin: 0 0 -1px -1px;
  display: flex;
  flex-wrap: wrap;
  > li {
    vertical-align: top;
    border-left: solid 1px ${COLOURS.GREY.DARKER};
    border-bottom: solid 1px ${COLOURS.GREY.DARKER};
    height: 120px;
    width: 50%;
    ${BREAKPOINTS.S`
      width: ${(100 / 3).toString(10)}%;
    `};
    > * {
      height: 100%;
    }
  }
`;
