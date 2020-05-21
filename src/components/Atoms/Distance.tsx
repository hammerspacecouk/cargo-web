import * as React from "react";
import styled from "styled-components";
import { MONOSPACE_FONT } from "@src/styles/typography";
import { TextD, TextF } from "./Text";
import { Fraction } from "./Fraction";
import { GRID } from "@src/styles/variables";

const StyledDistance = styled.div`
  ${MONOSPACE_FONT};
  font-variant: small-caps;
  position: absolute;
  top: ${GRID.UNIT};
  right: ${GRID.UNIT};
`;

export const Distance = React.memo(({ value }: { value: number }) => {
  let distance = <TextD>{value}</TextD>;
  if (value === 0) {
    distance = <Fraction num={1} den={100} />;
  }

  return (
    <StyledDistance>
      {distance}
      <abbr title="light years">
        <TextF>ly</TextF>
      </abbr>
    </StyledDistance>
  );
});
